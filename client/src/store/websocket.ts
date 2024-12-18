import { defineStore } from 'pinia';
import { DeviceSocket } from '@/utils/websocket';
import api from '@/api';
import { useEtcStore } from './etc';
import { initParams } from './utils/websocket';
import type { IDeviceParams } from '@/model/device';
import { useDeviceStore } from './device';

const etcStore = useEtcStore();
const deviceStore = useDeviceStore();

export const useWebSocketStore = defineStore('websocket', {
    state: (): any => {
        return {
            wsConnect: false,
            deviceSocket: null,
        }
    },
    actions: {
        async initDeviceWebSocket() {
            /** 首先获取分配的服务地址 */
            const { domain, port } = await api.dispatchServer.dispatchServer();
            const url = `wss://${domain}:${port}/api/ws`;
            this.deviceSocket = new DeviceSocket(url, {
                onConnectSuccess: () => {
                    this.wsConnect = true;
                    this.userOnline();
                },
                onConnectError: () => {
                    this.wsConnect = false;
                },
                onMessage: (data: any) => {
                    this.onMessage(data);
                }
            }, {
                initParams
            })
        },
        /** 用户上线 */
        async userOnline() {
            this.deviceSocket.send('userOnline')
        },
        /** 控制设备状态 */
        async setDeviceStatus(deviceid: string, params: IDeviceParams) {
            this.deviceSocket.send('update', {
                deviceid, params
            })
        },
        onMessage(data: any) {
            const { deviceid, params, error } = data ?? {};
            if( error !== undefined && error !== 0 ) {
                deviceStore.updateDeviceOnlineStatus(deviceid, false)
            }
            deviceStore.updateDeviceParamsStatus(deviceid, params);
        }

    },
    persist: true,
},)