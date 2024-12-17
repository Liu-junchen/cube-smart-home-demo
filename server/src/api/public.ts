import axios, { AxiosRequestConfig } from "axios";
import { type IHttpConfig, EHttpPath, type EReqMethod } from "../model/request";
import { createNonce } from "../utils/tools";
import { appId, getAuthSign } from "./config";


const createCommonHeader = (type: EReqMethod, params: object, at: string | null, needAt: boolean) => {
    const auth = needAt ? `Bearer ${at}` : `Sign ${getAuthSign(type, params)}`;
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-CK-Appid': appId,
        'X-CK-Nonce':createNonce(),
        Authorization: auth,
    };
}

export default async function request(httpConfig: IHttpConfig): Promise<{ error: number, msg: string, data: any }> {
    const { ip, path, method, at = '', params = {}, v2Api = false, needAt = true } = httpConfig
    const baseUrl = v2Api ? EHttpPath.V2_API : EHttpPath.SSE;
    const url = `https://${ip}${baseUrl}${path}`;

    const headers = createCommonHeader(method, params, at, needAt)
    const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        timeout: 5000
    }
    if (Object.keys(params).length) {
        config.data = params
    }

    const resp = await axios(config);
    return resp.data
}

