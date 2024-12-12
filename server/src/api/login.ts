import request from './public';
import { EReqMethod, EHttpPath } from '../model/request';

const login = (params: { countryCode: string; phoneNumber: string; password: string }) => {
    return request<{
        at: string,
        user: {
            apikey: string;
            [k: string]: any;
        }
    }>({
        ip: '',
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