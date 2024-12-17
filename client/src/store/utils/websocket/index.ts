import { useEtcStore } from '../../etc';
import { createNonce } from '@/utils/tools';

const etcStore = useEtcStore();


/** 初始化参数 */
export const initParams = (action: string, params?: Record<string, unknown>) => {
    let result: Record<string, unknown> = {
        action,
        apikey: etcStore.apikey,
        nonce: createNonce(),
        at: etcStore.at,
        sequence: "1734399932834",
        ts: "1734399933",
        userAgent: 'app',
        version: 8,
    };
    if (params) {
        result = { ...result, ...params };
    }
    return JSON.stringify(result);
}