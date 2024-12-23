import { request } from './public';
import { EReqMethod } from '@/model/request';
import { type EUserStatus } from '@/model/etc';

const login = (params: { countryCode: string; phoneNumber: string; password: string }) => {
    return request<{ at: string, user: { apikey: string; [k: string]: unknown } }>('/user/login', params, EReqMethod.POST);
}

const getUserStatus = () => {
    return request<{ userStatus: EUserStatus }>('/user/status', {}, EReqMethod.GET);
}

const logout = () => {
    return request<{}>('/user/logout', {}, EReqMethod.POST);
}

export default {
    getUserStatus,
    login,
    logout
}