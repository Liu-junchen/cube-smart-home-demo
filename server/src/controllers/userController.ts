import { Request, Response } from 'express';
import { loginService } from '../services/userService';

// 处理获取用户信息的请求逻辑，调用服务层去获取第三方接口数据并返回给前端
export const loginController = async (req: Request, res: Response) => {
    try {
        // 这里可以从req中获取前端传来的一些额外参数等（比如可能有特定的标识用于第三方鉴权等，此处先省略具体获取逻辑）
        const result = await loginService(req);
        res.status(200).json(result);
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
};