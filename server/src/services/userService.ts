import { Request, Response } from 'express';
import api from '../api/index'
import { storeJson } from '../utils/tools';

export const loginService = async (req: Request) => {
    try {
        const response = await api.login.login(req.body);
        const { error, data } = response;
        if (error == 0) {
            storeJson('user', 'at', data?.at);
        }
        return response;

    } catch (error) {
        console.error('调用第三方接口出错:', error);
        throw new Error('调用第三方接口获取用户信息失败');
    }
};