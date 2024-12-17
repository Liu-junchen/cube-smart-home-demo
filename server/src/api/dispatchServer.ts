import request from './public';
import { EReqMethod } from '../model/request';

const dispatchServer = async() => {
    return request({
        ip: '',
        path: '/dispatch/app',
        method: EReqMethod.GET
    });
}

export default {
    dispatchServer
}