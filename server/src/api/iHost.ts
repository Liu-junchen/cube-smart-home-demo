import request from './public';
import { EReqMethod, EHttpPath } from '../model/request';
import { type IThridEvent } from '../model/iHostDevice'

/** 获取 iHost token */
const getIHostToken = () => {
    return request<{
        token: string
    }>({
        ip: '192.168.5.214',
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
const syncDevice = (params: IThridEvent) => {
    return request({
        ip: '192.168.5.214',
        path: '/thirdparty/event',
        method: EReqMethod.POST,
        domain: EHttpPath.OPEN_API,
        params,
        https: false,
        needToken: true,
        needAt: false,
    });
}
/** 删除同步到 iHost 的设备*/
const deleteSyncDevice = (serial_number: string) => {
    return request({
        ip: '192.168.5.214',
        path: `/devices/${serial_number}`,
        method: EReqMethod.DELETE,
        domain: EHttpPath.OPEN_API,
        https: false,
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
        ip: '192.168.5.214',
        path: '/devices',
        method: EReqMethod.GET,
        domain: EHttpPath.OPEN_API,
        https: false,
        needToken: true,
        needAt: false,
    });
}



export default {
    getIHostToken, syncDevice, getIHostDevices, deleteSyncDevice
}