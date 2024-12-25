import { Request, Response } from 'express';
import api from '../api/index';
import { storeKeyValue, getKeyValue } from '../utils/tools';
import { IHostDevice } from '../types/iHostDevice';
import { v4 } from 'uuid';
import { IDevice } from '../types/device';

/** 同步设备方法 */
const syncDevice = async (deviceInfo: IDevice) => {
    const ihostDeviceInfo = new IHostDevice(deviceInfo);
    const params = {
        event: {
            header: {
                name: 'DiscoveryRequest',
                message_id: v4(),
                version: '2'
            },
            payload: {
                endpoints: [ihostDeviceInfo]
            }
        },
    }
    const res = await api.iHost.syncDevice(params);
    return res
}

export const syncDeviceService = async (req: Request) => {
    try {
        const tokenExist = getKeyValue('iHost', 'token');
        if (tokenExist) {
            const response = await syncDevice(req.body);
            return response;
        }

        const response = await api.iHost.getIHostToken();
        const { error, data } = response;

        if (error === 401) {
            return response;
        }

        if (error === 0) {
            const { token } = data ?? {};
            storeKeyValue('iHost', 'token', token);
            const result = await api.iHost.getIHostDevices();
            const deviceList = result.data?.device_list ?? [];

            const isDeviceSynced = deviceList.some(item => item.tags?.deviceid === req.body.deviceid);
            // 如果设备已经同步到 iHost 了，此处不会同步
            if (isDeviceSynced) {
                return {
                    error: 0,
                    msg: '',
                    data: {}
                }
            }
            const response = await syncDevice(req.body);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

// 取消设备同步方法
export const deleteSyncDeviceService = async (req: Request, res: Response) => {
    try {
        const { deviceid } = req.body ?? {};
        const result = await api.iHost.getIHostDevices();
        const deviceList = result.data?.device_list ?? [];

        const serial_number = deviceList.find((item: any) => item.tags?.deviceid === deviceid)?.serial_number!;
        const { error, message: msg, data } = await api.iHost.deleteSyncDevice(serial_number);
        return {
            error,
            msg,
            data
        }
    } catch (error) {
        console.log(error);
    }
}