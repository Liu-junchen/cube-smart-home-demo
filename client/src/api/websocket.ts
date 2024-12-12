import { request } from './public';
import { EReqMethod } from '@/model/request';

const initWebSocket = () => {
    return request<{ }>('/websocket/init', {}, EReqMethod.POST);
}

export default {
    initWebSocket
}