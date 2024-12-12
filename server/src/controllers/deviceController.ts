import { Request, Response } from 'express';
import { getDeviceListService, deviceChangeService, deviceChangeByIHostService } from '../services/deviceService';

// 处理获取用户信息的请求逻辑，调用服务层去获取第三方接口数据并返回给前端
export const getDeviceListController = async (req: Request, res: Response) => {
    try {
        const result = await getDeviceListService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const deviceChangeController = async (req: Request, res: Response) => {
    try {
        const result = await deviceChangeService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const deviceChangeByIHostController = async (req: Request, res: Response) => {
    try {
        const result = await deviceChangeByIHostService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};