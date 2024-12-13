import CryptoJS from 'crypto-js';
import { EReqMethod } from '@/model/request'

const regionApiUrlMap = new Map();
regionApiUrlMap.set('cn','https://cn-apia.coolkit.cn');
regionApiUrlMap.set('as','https://as-apia.coolkit.cc');
regionApiUrlMap.set('us','https://us-apia.coolkit.cc');
regionApiUrlMap.set('eu','https://eu-apia.coolkit.cc');

const { REGION, APP_ID, APP_SECRET } = import.meta.env ?? {};

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
    const message = ["POST","PUT"].includes(type) ? params : paramsToQueryString(params);
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message as any, APP_SECRET));
}

const apiUrl = regionApiUrlMap.get(REGION);
const appId = APP_ID;
// const sign = 

export {
    apiUrl,
    getAuthSign
}
