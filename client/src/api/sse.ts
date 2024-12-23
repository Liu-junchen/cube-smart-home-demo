import { request } from './public';
import { EReqMethod } from '@/model/request';

/** 初始化 nodejs 的 sse 客户端 */
const initSSE = () => {
    return request<{ }>('/sse/init', {}, EReqMethod.POST);
}

export default {
    initSSE
}