import { request } from './public';
import { EReqMethod } from '@/types/request';

/** 初始化 nodejs 的 sse 客户端 */
const initSSE = () => {
    return request<{ }>('/sse/init', {}, EReqMethod.POST);
}

export default {
    initSSE
}