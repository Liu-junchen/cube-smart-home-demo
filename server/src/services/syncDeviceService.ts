import { Request, Response } from 'express';
import api from '../api/index';
import { storeJson, getJson } from '../utils/tools';
import { IHostDevice } from '../model/iHostDevice';


const syncDevice = async(deviceInfo: any) => {
    const ihostDeviceInfo = new IHostDevice(deviceInfo);
    const res = await api.iHost.syncDevice(ihostDeviceInfo);

}

export const syncDeviceService = async (req: Request) => {
    try {
        const tokenExist = getJson('iHost', 'token');

        if (!tokenExist) {
            const response = await api.iHost.getIHostToken();
            const { error, data } = response;

            if (error === 401) {
                return response;
            }

            if (error === 0) {
                const { token } = data ?? {};
                storeJson('iHost', 'token', token);
                syncDevice(req.body);
            }
        }

        syncDevice(req.body);
        return {};


    } catch (error) {
        console.error('调用第三方接口出错:', error);
        throw new Error('调用第三方接口获取用户信息失败');
    }
};