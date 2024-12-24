import { request } from './public';
import { EReqMethod } from '@/types/request';

/** 初始化 nodejs 的 websocket 客户端 */
const initWebSocket = () => {
    return request<{ }>('/websocket/init', {}, EReqMethod.POST);
}

export default {
    initWebSocket
}