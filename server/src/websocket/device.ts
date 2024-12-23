import api from '../api/index';
import { v4 } from 'uuid';
import { IDeviceParams } from '../model/device';

/** 更改设备状态同步到 iHost  */
export const deviceChangeSyncToIHost = async (deviceid: string, params: IDeviceParams & { online: boolean }) => {
    try {
        // 首先我们获取一下 ihost 的设备列表
        const { switches, online } = params ?? {};
        const result = await api.iHost.getIHostDevices();
        const deviceList = result.data?.device_list;

        const serial_number = deviceList?.find((item) => item.tags?.deviceid === deviceid)?.serial_number;

        // 找不到在 iHost 下对应的设备，说明该设备还未同步
        if(!serial_number) {
            return;
        }

        const state: Record<string, any> = {
            toggle: {}
        };
        switches?.forEach((item: { switch: string, outlet: number }) => {
            state.toggle[item.outlet + 1] = {
                toggleState: item.switch
            }
        })

        /** 是否是设备上线事件 */
        const isOnlineEvent = online !== undefined;

        const eventHeaderName = isOnlineEvent ? 'DeviceOnlineChangeReport' : 'DeviceStatesChangeReport';
        const payload = isOnlineEvent ? {
            online,
        } : {
            state
        }

        const data = {
            event: {
                header: {
                    name: eventHeaderName,
                    message_id: v4(),
                    version: "2"
                },
                endpoint: {
                    serial_number,
                    third_serial_number: deviceid,
                },
                payload
            }
        }
        api.iHost.syncDevice(data);
    } catch (error) {
        console.log(error);

    }
};