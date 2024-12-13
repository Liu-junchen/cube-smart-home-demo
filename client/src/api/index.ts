import axios, { type CancelToken, type AxiosRequestConfig } from 'axios';
import { useEtcStore } from '@/store/etc';
import { message } from 'ant-design-vue';
import router from '@/router';
import { apiUrl, getAuthSign } from './config'
import { IResponse, EReqMethod } from '@/model/request';

/**
 * 存在at时，必须先调用该方法 初始化at
 * @param at
 */
function init(at: string) {
    const etc = useEtcStore();
    etc.setAt(at);
}

/**
 * 获取 at
 * @returns
 */
function getAt() {
    const etc = useEtcStore();
    return etc.at;
}

/** 通用错误码处理 */
const commonErrorHandler = (data: any) => {
    // 登录状态过期或者失效
    if (data && (data.error === 402 || data.error === 401)) {
        message.error('登录过期');
        router.push({ path: '/login' });
    }
    if (data && data.error === 500) {
        message.error('登录失败');
    }
};

function createNoce() {
    const chars = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    let result = '';
    for (let i = 0; i < 8; i++) {
        const num = Math.ceil(Math.random() * (chars.length - 1));
        result += chars[num];
    }
    return result;
}

const createCommonHeader = (type: EReqMethod, params: object, at: string | null) => {
    const auth = at ? `Bearer ${at}` : `Sign ${getAuthSign(type, params)}`;
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        Nonce: createNoce(),
        Authorization: auth,
    };
}

// 初始化axios设置
axios.defaults.baseURL = apiUrl;
axios.defaults.timeout = 60000;


/**
 * 添加响应拦截器,用于抛出事件给前端异常处理
 * 专门用来处理通用错误返回码
 */
axios.interceptors.response.use((response) => {
    if (response) {
        const {
            status,
            data,
            config: { url },
        } = response;

        const { error } = data;
        // 通用状态码处理逻辑
        if (url && status === 200 && error && error != 0 && error.toString().length === 3) {
            console.log(`common error ${url}`);
            console.log('data', data);
            commonErrorHandler(data);
            return;
        }

        // 业务接口错误码统一消息提示
        if (url && status === 200 && error && error != 0 && error.toString().length > 3) {
            message.error(`Error[${error}]`);
        }
    }
    // 对响应数据做点什么
    return response;
});

async function request<T>(url: string, params: object, methodType: EReqMethod, at: string | null = null, cancelToken?: CancelToken) {
    const headers = createCommonHeader(methodType, params, at);

    const axiosConfig = {
        url,
        method: methodType,
        headers,
        params,
        cancelToken,
    } as AxiosRequestConfig;

    if (methodType === EReqMethod.POST || methodType === EReqMethod.PUT || methodType === EReqMethod.DELETE || methodType === EReqMethod.OPTIONS) {
        delete axiosConfig.params;
        axiosConfig['data'] = params;
    }

    // console.log('http请求参数', axiosConfig);


    try {
        const result = await axios(axiosConfig);

        // const { data, status } = result;
        // console.log(`http请求结束 url:${url}`, `method:${methodType}`, 'params:', params);
        return result ? result.data as IResponse<T> : {} as IResponse<T>;
    } catch (error) {

        // 报错中包含网络错误，即后端接口失效
        // const etcStore = useEtcStore();
        const errorStr = JSON.stringify(error);
        if (errorStr.includes('Network Error') || errorStr.includes('code 502')) {
            // etcStore.setIsLoading(true)
            // window.location.reload();
            // TODO: 此处需要重连 websocket
            // useDisconnect().startReconnect();
        }

        if (axios.isAxiosError(error)) {
            console.log('http request axios error: ', error.code, error.message);
            // 超时错误返回特定的msg
            const msg = error.message.includes('timeout') ? 'timeout' : error.message;
            return {
                error: 500,
                msg
            };
        }


        console.log('http request unknown error: ', error);
        return {
            error: 500,
            msg: 'http api module unknown error'
        };
    }

}

export default {
    init,
    getAt,
    request,
};
