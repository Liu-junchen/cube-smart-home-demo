import request from './public';
import { EReqMethod } from '../model/request';

const login = (params: { countryCode: string; phoneNumber: string; password: string }) => {
    return request({
        ip: '',
        path: '/user/login',
        params,
        method: EReqMethod.POST,
        needAt: false,
        v2Api: true,
    });
}

export default {
    login
}