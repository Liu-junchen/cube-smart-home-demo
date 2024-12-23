import axios, { type CancelToken, type AxiosRequestConfig } from 'axios';
import { type IResponse, EReqMethod } from '@/model/request';

// 初始化axios设置
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 6000;

export async function request<T>(url: string, params: object, methodType: EReqMethod, cancelToken?: CancelToken, ) {
    const axiosConfig = {
        url,
        method: methodType,
        params,
        cancelToken,
    } as AxiosRequestConfig;

    if (methodType === EReqMethod.POST || methodType === EReqMethod.PUT || methodType === EReqMethod.DELETE || methodType === EReqMethod.OPTIONS) {
        delete axiosConfig.params;
        axiosConfig['data'] = params;
    }

    try {
        const result = await axios(axiosConfig);
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