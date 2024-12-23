import axios, { AxiosRequestConfig } from "axios";
import { type IHttpConfig, EHttpPath, EReqMethod, IResponse } from "../model/request";
import { createNonce } from "../utils/tools";
import { appId, getAuthSign } from "./config";
import { getKeyValue } from "../utils/tools";

const getAt = () => {
    return getKeyValue('user', 'at');
}
const getToken = () => {
    return getKeyValue('iHost', 'token');
}


const createCommonHeader = (type: EReqMethod, params: object, needAt: boolean, needToken: boolean,) => {
    const at = getAt();
    const token = getToken();
    const auth = needAt || needToken ? `Bearer ${needAt ? at : needToken ? token : ''}` : `Sign ${getAuthSign(type, params)}`;
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-CK-Appid': appId,
        'X-CK-Nonce': createNonce(),
        Authorization: auth,
    };
}

const allowRequest = (needAt: boolean, needToken: boolean) => {
    const at = getAt();
    const token = getToken();
    return needAt? !!at : needToken? !!token : true;
}

export default async function request<T>(httpConfig: IHttpConfig) {
    try {
        const { ip, path, method, params = {}, domain, needAt = true, https = true, needToken = false } = httpConfig

        if(!allowRequest(needAt, needToken)) {
            return {
                error: 401,
                msg: 'need Bearer'!,
            }
        }
        const url = `${https ? 'https' : 'http'}://${ip}${domain}${path}`;

        const headers = createCommonHeader(method, params, needAt, needToken)
        const config: AxiosRequestConfig = {
            url,
            method,
            headers,
            timeout: 5000
        }

        if (Object.keys(params).length) {
            config.params = params
        }

        if (method === EReqMethod.POST || method === EReqMethod.PUT || method === EReqMethod.DELETE || method === EReqMethod.OPTIONS) {
            delete config.params;
            config['data'] = params;
        }
        
        const resp = await axios(config);

        return resp.data as IResponse<T>;
    } catch (error) {
        console.log('request res error =====>', error);
        return {} as IResponse<T>
    }
}

