import { Request, Response } from 'express';
import { dispatchServerService } from '../services/dispatchServerService';

// 处理获取用户信息的请求逻辑，调用服务层去获取第三方接口数据并返回给前端
export const dispatchServerController = async (req: Request, res: Response) => {
    try {
        // 这里可以从req中获取前端传来的一些额外参数等（比如可能有特定的标识用于第三方鉴权等，此处先省略具体获取逻辑）
        const result = await dispatchServerService();
        return result
    } catch (error) {
    }
};