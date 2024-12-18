import axios, { AxiosRequestConfig } from "axios";
import { type IHttpConfig, EHttpPath, type EReqMethod } from "../model/request";
import { createNonce } from "../utils/tools";
import { appId, getAuthSign } from "./config";
import fs from 'fs';
import path from 'path';

const getAt = () => {
    const sqlPath = path.join(__dirname, '../../../sql.json');;
    const jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    return savedData.user.at;
}


const createCommonHeader = (type: EReqMethod, params: object, needAt: boolean) => {
    const at = getAt();
    const auth = needAt ? `Bearer ${at}` : `Sign ${getAuthSign(type, params)}`;
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-CK-Appid': appId,
        'X-CK-Nonce': createNonce(),
        Authorization: auth,
    };
}

export default async function request(httpConfig: IHttpConfig): Promise<{ error: number, msg: string, data: any }> {
    try {
        const { ip, path, method, params = {}, domain, needAt = true } = httpConfig
        const url = `https://${ip}${domain}${path}`;

        const headers = createCommonHeader(method, params, needAt)
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
    } catch (error) {
        console.log('cccddd =====> request res error', error);
        return {} as any
    }
}

