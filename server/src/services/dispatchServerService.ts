import { Request, Response } from 'express';
import api from '../api/index'


// 函数用于调用第三方接口获取用户信息，此处简单示例，实际中可能需要处理更多请求头、请求参数等情况
export const dispatchServerService = async () => {
    try {
        const response = await api.dispatchServer.dispatchServer();
        return response;
    } catch (error) {
        console.error('调用第三方接口出错:', error);
        throw new Error('调用第三方接口获取用户信息失败');
    }
};