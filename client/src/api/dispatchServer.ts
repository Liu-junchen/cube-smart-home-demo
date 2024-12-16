import { request } from './public';
import { EReqMethod } from '@/model/request';

const dispatchServer = () => {
    return request<undefined>('/device/thing', {}, EReqMethod.GET);
}

export default {
    dispatchServer
}