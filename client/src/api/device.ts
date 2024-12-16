import { request } from './public';
import { EReqMethod } from '@/model/request';
import type { IThingData } from '@/model/device';

const getThingList = (params: { lang: string }) => {
    return request<{ thingList?: IThingData[] }>('/device/thing', params, EReqMethod.GET);
}

export default {
    getThingList
}