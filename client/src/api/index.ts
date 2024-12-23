import axios from 'axios';
import { message } from 'ant-design-vue';
import router from '@/router';
import user from './user';
import device from './device';
import dispatchServer from './dispatchServer';
import syncDevice from './syncDevice';
import websocket from './websocket';
import sse from './sse';


/** 通用错误码处理 */
const commonErrorHandler = (data: any) => {
    // 登录状态过期或者失效
    if (data && (data.error === 402 || data.error === 401)) {
        message.error('登录失效');
        router.push({ path: '/login' });
    }
    if (data && data.error === 500) {
        message.error('登录失败');
    }
    message.error(data.msg)
};


/**
 * 添加响应拦截器,用于抛出事件给前端异常处理
 * 专门用来处理通用错误返回码
 */
axios.interceptors.response.use((response) => {
    if (response) {
        const {
            status,
            data,
            config: { url },
        } = response;

        const { error } = data;
        const isIHost = data.message !== undefined;


        // 通用状态码处理逻辑
        if (url && status === 200 && error && error != 0 && error.toString().length === 3 && !isIHost) {
            console.log(`common error ${url}`);
            console.log('data', data);
            commonErrorHandler(data);
            return;
        }

        // 业务接口错误码统一消息提示
        if (url && status === 200 && error && error != 0 && error.toString().length > 3) {
            message.error(`Error[${error}]`);
        }
    }
    // 对响应数据做点什么
    return response;
});

export default {
    user, device, dispatchServer, syncDevice, websocket, sse
}