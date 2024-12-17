/**
 * 断连后开始重连逻辑
 *
 * 触发条件：
 * 1. sse 触发 error 事件或者超时未接收到心跳信息（message 事件）
 * 2. 发出 http 请求时报错。
 *
 * 重连机制：
 * 重连函数 startReconnect 执行，检测前端到 iHost 后端的 http 连通性，
 * 失败则等待一定的时间，该时间每次增加 5 秒，最大为 60 秒，然后递归调用自身开始下一次检测，
 * 成功则停止递归，开始重连 sse。
 */

import { apiUrl } from '../config';
import { ref, watch } from 'vue';
import { useSseStore } from '@/store/sse';
import { sleep } from '@/utils/tools';
import { useEtcStore } from '@/store/etc';
import { EDisconnectStatus } from '@/ts/enum/EDisconnectStatus';
import { useBackupStore } from '@/store/backup';
import { ELastOperationState } from '@/api/v1/ts/interface/IBackupApi';

/** 是否连通（sse已连接，iHost 后端可访问） */
const connected = ref(true);
/** 检测访问 iHost 后端的连通性超时时间，单位：s */
const TEST_HTTP_CONNECT_TIMEOUT = 5;
/** 是否处于重连中 */
const reconnecting = ref(false);
/** startReconnect 方法是否开始执行 */
let startReconnectFuncExec = false;
/** 下次重连倒计时 */
let reconnectCount = 0;
/** 递归定时器 */
let recursionTimer: ReturnType<typeof setTimeout>;
/** 递归终止器 */
const RECONNECT_IMMEDIATELY_TAG = ref(false);

/** 是否为用户手动断开连接（重启/升级/重置） */
export const getIsManualDisconnect = () => {
    const etcStore = useEtcStore();
    return [EDisconnectStatus.RESTART, EDisconnectStatus.RESET, EDisconnectStatus.UPGRADE].includes(etcStore.disconnectStatus);
};

/**
 * 检查是否可访问 iHost 后端的连通性
 * @param {number} timeout 超时时间
 * @returns {Promise<boolean>}
 */
const tryReconnectHttp = async (timeout: number) => {
    try {
        const controller = new AbortController();
        const testHttpConnectedPromise = () => fetch(`${apiUrl}/bridge`, { signal: controller.signal });
        const timeoutPromise = async () => {
            await sleep(timeout);
            controller.abort();
            return new Response('timeout', { status: 504, statusText: 'timeout' });
        };
        const { ok, status } = await Promise.race([timeoutPromise(), testHttpConnectedPromise()]);
        return ok && status === 200;
    } catch {
        return false;
    }
};

/**
 * 开始重连
 * 1. 判断 see 是否断连，断连则重连 see
 * 2. 判断 http 请求访问到 iHost 后端的连通性
 * @param {Function} callback 重连成功之后的回调函数
 */
const startReconnect = async (callback?: () => void) => {
    if (startReconnectFuncExec) {
        return;
    }

    const etcStore = useEtcStore();
    const backupStore = useBackupStore();

    /** 若当前已知处于备份/备份恢复状态,则不再进行重连 */
    if ([EDisconnectStatus.BACKUP, EDisconnectStatus.RESTORE].includes(etcStore.disconnectStatus)) {
        return;
    }

    /** 若查询到当前处于备份/备份恢复/备份恢复中断状态,则不再进行重连 */
    const lastOperation = await backupStore.getLastOperation();
    if ([ELastOperationState.BACKUP_IN_PROGRESS, ELastOperationState.RECOVERY_IN_PROGRESS, ELastOperationState.RECOVERY_INTERRUPT].includes(lastOperation)) {
        return;
    }

    startReconnectFuncExec = true;
    connected.value = false;
    // addReconnectCount: 每次重连结束后，下次重连间隔时间是否增加5s。默认情况下自增5s, 手动点击重连时不自增
    const reconnect = async (addReconnectCount = true) => {
        reconnecting.value = true;
        // 是否是用户手动操作的情况下断连：重启，重置，固件升级等
        const isManualDisconnect = getIsManualDisconnect();
        const result = await tryReconnectHttp(TEST_HTTP_CONNECT_TIMEOUT * 1000);

        // 非用户手动操作情况下断连时，手动延迟1s避免接口失败/成功太快loading动画一闪而过的观感问题
        if (!isManualDisconnect) {
            await sleep(1000);
        }

        connected.value = result;
        reconnecting.value = false;

        // 重连成功，调用回调函数，重连sse，结束递归
        if (connected.value) {
            startReconnectFuncExec = false;
            reconnectCount = 0;
            const sseStore = useSseStore();
            etcStore.setDisconnectStatus(EDisconnectStatus.NULL);
            sseStore.startSse();
            callback && callback();
            return;
        }

        // 重启，重置，ota升级时不做重连时间退避
        if (isManualDisconnect) {
            reconnectCount = 5;
        } else if (addReconnectCount) {
            reconnectCount = reconnectCount === 60 ? 60 : (reconnectCount + 5);
        }

        // 重连失败，定时递归重连
        recursionTimer = setTimeout(reconnect, reconnectCount * 1000);
    };

    // 手动点击触发重连时取消定时器，立即开始重连
    watch(RECONNECT_IMMEDIATELY_TAG, (val) => {
        if (val) {
            clearTimeout(recursionTimer);
            reconnect(false);
            RECONNECT_IMMEDIATELY_TAG.value = false;
        }
    });

    reconnect();
};

/**
 * 取消下次倒计时等待时间，直接开始重连
 */
const reconnectImmediately = () => {
    // 触发 watch 监听器，在监听器中取消下次重连定时器，直接开始重连
    RECONNECT_IMMEDIATELY_TAG.value = true;
};

/**
 * 倒计时逻辑
 */
const useReconnectCountdown = () => {
    let countdownInterval: ReturnType<typeof setInterval>;
    const countdown = ref(0);
    watch(reconnecting, (val) => {
        if (val) {
            clearInterval(countdownInterval);
        } else {
            countdown.value = reconnectCount;
            countdownInterval = setInterval(() => {
                countdown.value = countdown.value > 0 ? countdown.value - 1 : 0;
            }, 1000);
        }
    });
    watch(connected, (val) => {
        if (val) {
            clearInterval(countdownInterval);
        }
    });

    return {
        countdown
    };
};

export function useDisconnect() {
    return {
        connected,
        reconnecting,
        startReconnect,
        reconnectImmediately,
        useReconnectCountdown
    };
}
