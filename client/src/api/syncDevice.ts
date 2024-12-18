import type { IDevice } from '@/model/device';
import { request } from './public';
import { EReqMethod } from '@/model/request';

const syncDevice = (params: IDevice) => {
    return request<any>('/sync/device', params, EReqMethod.POST);
}

export default {
    syncDevice
}