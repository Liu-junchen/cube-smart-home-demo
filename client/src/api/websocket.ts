import { request } from './public';
import { EReqMethod } from '@/model/request';

/** 初始化 nodejs 的 websocket 客户端 */
const initWebSocket = () => {
    return request<{ }>('/websocket/init', {}, EReqMethod.POST);
}

export default {
    initWebSocket
}