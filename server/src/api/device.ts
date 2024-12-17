import request from './public';
import { EReqMethod, EHttpPath } from '../model/request';

const getThingList = (params: { lang: string }) => {
    return request({
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