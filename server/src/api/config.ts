import CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';
import { EReqMethod } from '../types/request';

dotenv.config();

const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET ?? '';
console.log('APP_ID', APP_ID, APP_SECRET);


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
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, APP_SECRET));
}

const appId = APP_ID;
// const sign = 

export {
    appId,
    getAuthSign
}
