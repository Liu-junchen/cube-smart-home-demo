import request from './public';
import { EReqMethod } from '../model/request';

const getThingList = (params: { lang: string }) => {
    return request({
        ip: '',
        path: '/device/thing',
        params,
        method: EReqMethod.GET
    });
}

export default {
    getThingList
}