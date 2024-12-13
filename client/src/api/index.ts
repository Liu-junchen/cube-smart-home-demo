import axios from 'axios';
import { message } from 'ant-design-vue';
import router from '@/router';
import { useEtcStore } from '@/store/etc';
import login from './login';

/**
 * 存在at时，必须先调用该方法 初始化at
 * @param at
 */
function init(at: string) {
    const etc = useEtcStore();
    etc.setAt(at);
}

/**
 * 获取 at
 * @returns
 */
function getAt() {
    const etc = useEtcStore();
    return etc.at;
}

/** 通用错误码处理 */
const commonErrorHandler = (data: any) => {
    // 登录状态过期或者失效
    if (data && (data.error === 402 || data.error === 401)) {
        message.error('登录过期');
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
        // 通用状态码处理逻辑
        if (url && status === 200 && error && error != 0 && error.toString().length === 3) {
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
    init, getAt, login,
}