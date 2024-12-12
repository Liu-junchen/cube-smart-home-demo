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
/** 设备和 iHost 的同步相关接口 */
const syncDevice = (params: any) => {
    return request({
        ip: '192.168.5.215',
        path: '/thirdparty/event',
        method: EReqMethod.POST,
        domain: EHttpPath.OPEN_API,
        params,
        https: false,
        needToken: true,
        needAt: false,
    });
}

/** 获取 iHost 的设备列表 */
const getIHostDevices = () => {
    return request<{ device_list: any }>({
        ip: '192.168.5.215',
        path: '/devices',
        method: EReqMethod.GET,
        domain: EHttpPath.OPEN_API,
        https: false,
        needToken: true,
        needAt: false,
    });
}



export default {
    getIHostToken, syncDevice, getIHostDevices
}