import api from '../api/index'

// 函数用于调用第三方接口获取用户信息，此处简单示例，实际中可能需要处理更多请求头、请求参数等情况
export const dispatchServerService = async () => {
    try {
        const res = await api.dispatchServer.dispatchServer();
        return res;
    } catch (error) {
        console.log(error);
    }
};