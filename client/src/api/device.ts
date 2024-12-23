import { request } from './public';
import { EReqMethod } from '@/model/request';
import type { IDeviceData, ISwitchConfig } from '@/model/device';

const getDeviceList = (params: { lang: string }) => {
    return request<IDeviceData>('/device/list', params, EReqMethod.GET);
}

const changeDeviceStatus = (params: { params: { switches: ISwitchConfig[] }, deviceid: string }) => {
    return request<{}>('/device/change', params, EReqMethod.POST);
}

export default {
    getDeviceList, changeDeviceStatus
}