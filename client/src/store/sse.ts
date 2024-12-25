
import { defineStore } from 'pinia';
import { SSEClient } from '@/utils/sse';
import { useDeviceStore } from './device';
const deviceStore = useDeviceStore();

export const useSSEStore = defineStore('sse', {
    state: (): { sseClient: SSEClient | null } => {
        return {
            /** 设备列表 */
            sseClient: null,
        }
    },
    actions: {
        initSSEClient() {
            this.sseClient = new SSEClient('http://localhost:3000/sse/bridge', {});
            // 注册设备状态变化的 sse 事件
            this.sseClient.subscribe('change_report', (data: any) => {
                const { deviceid, params } = data;
                deviceStore.updateDeviceStatus(deviceid, params);
            })
            // 注册设备被 iHost 删除的 sse 事件
            this.sseClient.subscribe('delete_report', (data: any) => {
                const { deviceid, params } = data ?? {};
                deviceStore.updateDeviceStatus(deviceid, params);
            })
        },
        destroySSEClient() {
            if(!this.sseClient) return;
            this.sseClient.close();
        }
    },
    persist: true,
},)