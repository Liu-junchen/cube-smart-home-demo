import request from './public';
import { EReqMethod, EHttpPath } from '../model/request';

const dispatchServer = async() => {
    return request<undefined>({
        ip: '',
        path: '/dispatch/app',
        method: EReqMethod.GET,
        domain: EHttpPath.DISPATCH_API,
    });
}

export default {
    dispatchServer
}