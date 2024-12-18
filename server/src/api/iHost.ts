import request from './public';
import { EReqMethod, EHttpPath } from '../model/request';

/** 获取 iHost token */
const getIHostToken = () => {
    return request<{
        token: string
    }>({
        ip: '192.168.5.215',
        path: '/bridge/access_token',
        method: EReqMethod.GET,
        domain: EHttpPath.OPEN_API,
        params: {
            app_name: 'CUBE demo'
        },
        https: false,
    });
}
/** 同步设备到 iHost */
const syncDevice = (params: any) => {
    return request({
        ip: '192.168.5.215',
        path: '/thirdparty/event',
        method: EReqMethod.GET,
        domain: EHttpPath.OPEN_API,
        params,
        https: false,
        needToken: true,
    });
}

export default {
    getIHostToken
}