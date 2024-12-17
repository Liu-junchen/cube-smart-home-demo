import axios, { type CancelToken, type AxiosRequestConfig } from 'axios';
import api from './index'
import { getAuthSign, apiUrl, appId } from './config'
import { type IResponse, EReqMethod } from '@/model/request';
import { createNonce } from '@/utils/tools'

// 初始化axios设置
axios.defaults.baseURL = apiUrl;
axios.defaults.timeout = 60000;

const createCommonHeader = (type: EReqMethod, params: object, at: string | null, useAt: boolean) => {
    const auth = useAt ? `Bearer ${at}` : `Sign ${getAuthSign(type, params)}`;
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-CK-Appid': appId,
        'X-CK-Nonce':createNonce(),
        Authorization: auth,
    };
}

export async function request<T>(url: string, params: object, methodType: EReqMethod, useAt: boolean = true, cancelToken?: CancelToken, ) {
    const at = api.getAt();
    const headers = createCommonHeader(methodType, params, at, useAt);

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
