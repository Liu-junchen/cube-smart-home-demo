import { Request, Response } from 'express';
import { syncDeviceService } from '../services/syncDeviceService';

// 处理获取用户信息的请求逻辑，调用服务层去获取第三方接口数据并返回给前端
export const syncDeviceController = async (req: Request, res: Response) => {
    try {
        const result = await syncDeviceService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};