import { request } from './public';
import { EReqMethod } from '@/model/request';

const login = (params: { countryCode: string; phoneNumber: string; password: string }) => {
    return request<{ at: string }>('/user/login', params, EReqMethod.POST);
}

export default {
    login
}