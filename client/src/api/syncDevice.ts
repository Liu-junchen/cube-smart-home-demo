import { request } from './public';
import { EReqMethod } from '@/model/request';

const syncDevice = () => {
    return request<any>('/sync/device', {}, EReqMethod.GET);
}

export default {
    syncDevice
}