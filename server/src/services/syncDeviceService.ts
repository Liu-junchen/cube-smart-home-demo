import { Request, Response } from 'express';
import util from 'util';
import api from '../api/index';
import { storeKeyValue, getKeyValue } from '../utils/tools';
import { IHostDevice } from '../model/iHostDevice';
import { v4 } from 'uuid';

/** 同步设备方法 */
const syncDevice = async (deviceInfo: any) => {
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

        if (!tokenExist) {
            const response = await api.iHost.getIHostToken();
            const { error, data } = response;

            if (error === 401) {
                return response;
            }

            if (error === 0) {
                const { token } = data ?? {};
                storeKeyValue('iHost', 'token', token);
                const response = await syncDevice(req.body);
                return response;
            }
        }
        const response = await syncDevice(req.body);
        return response;
    } catch (error) {
        console.log(error);
    }
};