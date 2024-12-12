import request from './public';
import { EReqMethod, EHttpPath } from '../model/request';
import { IThingData } from '../model/device';

const getThingList = (params: { lang: string }) => {
    return request<{
        thingList: IThingData[]
    }>({
        ip: '',
        path: '/device/thing',
        params,
        method: EReqMethod.GET,
        domain: EHttpPath.V2_API,
    });
}

export default {
    getThingList
}