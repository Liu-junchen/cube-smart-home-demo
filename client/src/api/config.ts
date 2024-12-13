import CryptoJS from 'crypto-js';
import { EReqMethod } from '@/model/request'

// const { VITE_APP_ID, VITE_APP_SECRET } = import.meta.env ?? {};
const VITE_APP_ID = import.meta.env.VITE_APP_ID;
const VITE_APP_SECRET = import.meta.env.VITE_APP_SECRET;

const paramsToQueryString = (params: Record<any, any>) => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            searchParams.append(key, params[key].toString());
        }
    }
    return searchParams.toString();
}

const getAuthSign = (type: EReqMethod, params: object) => {
    const message = ["POST","PUT"].includes(type) ? JSON.stringify(params) : paramsToQueryString(params);
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message as any, VITE_APP_SECRET));
}

const apiUrl = 'https://cn-apia.coolkit.cn/v2';
const appId = VITE_APP_ID;
// const sign = 

export {
    apiUrl,
    appId,
    getAuthSign
}
