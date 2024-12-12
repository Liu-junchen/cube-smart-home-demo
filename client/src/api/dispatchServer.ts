import { request } from './public';
import { EReqMethod } from '@/model/request';

const dispatchServer = async() => {
    return request<undefined>('/dispatch/app', {}, EReqMethod.GET);
}

export default {
    dispatchServer
}