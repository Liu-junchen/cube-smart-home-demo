import request from './public';
import { EReqMethod, EHttpPath } from '../types/request';

const dispatchServer = async() => {
    return request<undefined>({
        path: '/dispatch/app',
        method: EReqMethod.GET,
        domain: EHttpPath.DISPATCH_API,
    });
}

export default {
    dispatchServer
}