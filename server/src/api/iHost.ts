import request from './public';
import { EReqMethod, EHttpPath } from '../types/request';
import { type IThridEvent } from '../types/iHostDevice'

/** 获取 iHost token */
const getIHostToken = () => {
    return request<{
        token: string
    }>({
        path: '/bridge/access_token',
        method: EReqMethod.GET,
        domain: EHttpPath.OPEN_API,
        params: {
            app_name: 'CUBE demo'
        },
    });
}
/** 设备和 iHost 的同步相关接口 */
const syncDevice = (params: IThridEvent) => {
    return request({
        path: '/thirdparty/event',
        method: EReqMethod.POST,
        domain: EHttpPath.OPEN_API,
        params,
        needToken: true,
        needAt: false,
    });
}
/** 删除同步到 iHost 的设备*/
const deleteSyncDevice = (serial_number: string) => {
    return request({
        path: `/devices/${serial_number}`,
        method: EReqMethod.DELETE,
        domain: EHttpPath.OPEN_API,
        needToken: true,
        needAt: false,
    });
}

/** 获取 iHost 的设备列表 */
const getIHostDevices = () => {
    return request<{
        device_list: {
            tags: Record<string, any> | null;
            serial_number: string;
        }[]
    }>({
        path: '/devices',
        method: EReqMethod.GET,
        domain: EHttpPath.OPEN_API,
        needToken: true,
        needAt: false,
    });
}



export default {
    getIHostToken, syncDevice, getIHostDevices, deleteSyncDevice
}