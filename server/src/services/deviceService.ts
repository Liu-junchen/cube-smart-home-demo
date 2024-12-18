import { Request, Response } from 'express';
import api from '../api/index'

export const deviceService = async (req: Request) => {
    try {
        // 获取了 thing 列表
        const { error, data } = await api.device.getThingList(req.body);
        
        let result;

        return result;
        
    } catch (error) {
        console.error('调用第三方接口出错:', error);
        throw new Error('调用第三方接口获取用户信息失败');
    }
};