import request from './public';
import { EReqMethod, EHttpPath } from '../types/request';
import { IThingData } from '../types/device';

const getThingList = (params: { lang: string }) => {
    return request<{
        thingList: IThingData[]
    }>({
        path: '/device/thing',
        params,
        method: EReqMethod.GET,
        domain: EHttpPath.V2_API,
    });
}

export default {
    getThingList
}