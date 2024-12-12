
import { defineStore } from 'pinia';
import { SSEClient } from '@/utils/sse';
import { useDeviceStore } from './device';
const deviceStore = useDeviceStore();

export const useSseStore = defineStore('sse', {
    state: (): any => {
        return {
            /** 设备列表 */
            sseClient: null,
        }
    },
    actions: {
        initSseClient() {
            this.sseClient = new SSEClient('http://localhost:3000/sse/bridge', {});
            this.sseClient.subscribe('change_device', (data: any) => {
                console.log('data', data);
                
                const { deviceid, params } = data;
                deviceStore.updateDeviceSwitchesStatus(deviceid, params);
            })
        }
    },
    persist: true,
},)