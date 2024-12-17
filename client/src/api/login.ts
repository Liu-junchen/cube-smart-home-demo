import { request } from './public';
import { EReqMethod } from '@/model/request';

const login = (params: { countryCode: string; phoneNumber: string; password: string }) => {
    return request<{ at: string, user: { apikey: string; [k: string]: unknown } }>('/user/login', params, EReqMethod.POST, false);
}

export default {
    login
}