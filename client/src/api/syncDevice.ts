import type { IDevice } from '@/types/device';
import { request } from './public';
import { EReqMethod } from '@/types/request';

/** 同步设备到 iHost */
const syncDevice = (params: IDevice) => {
    return request<{}>('/sync/device', params, EReqMethod.POST);
}

/** 删除 iHost 上的设备 */
const cancelSyncDevice = (params: IDevice) => {
    return request<{}>('/sync/device', params, EReqMethod.DELETE);
}

export default {
    syncDevice, cancelSyncDevice
}