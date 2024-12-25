import request from './public';
import { EReqMethod, EHttpPath } from '../types/request';

const login = (params: { countryCode: string; phoneNumber: string; password: string }) => {
    return request<{
        at: string,
        user: {
            apikey: string;
            [k: string]: any;
        }
    }>({
        path: '/user/login',
        params,
        method: EReqMethod.POST,
        needAt: false,
        domain: EHttpPath.V2_API,
    });
}

export default {
    login
}