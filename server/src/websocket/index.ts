import { getKeyValue, createNonce, getModuleValue } from "../utils/tools";
import { DeviceSocket } from "../utils/websocket";
import api from "../api";
import { deviceChangeSyncToIHost } from './device'
import sse from '../utils/sse';

const initParams = (action: string, params?: Record<string, unknown>) => {
    let result: Record<string, unknown> = {
        action,
        apikey: getKeyValue('user', 'apikey'),
        nonce: createNonce(),
        at: getKeyValue('user', 'at'),
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

let deviceWebSocket: DeviceSocket | null = null;

const userOnline = () => {
    deviceWebSocket!.send('userOnline')
}

// 初始化 websocket
const initDeviceWebSocket = async () => {
    return new Promise(async(resolve, reject) => {
        const { at, apikey } = getModuleValue('user') ?? {};
        if (deviceWebSocket || !at || !apikey) return;
        const { domain, port } = await api.dispatchServer.dispatchServer();
        const url = `wss://${domain}:${port}/api/ws`;
        console.log('url', url);

        deviceWebSocket = new DeviceSocket(url, {
            onConnectSuccess: () => {
                resolve(true);
                userOnline();
            },
            onConnectError: (err: any) => {
                reject(err);
            },
            onMessage: (data: any) => {
                console.log('data', data);

                if (data.action === 'update') {
                    const { deviceid, params } = data;

                    deviceChangeSyncToIHost(deviceid, params.switches);
                    sse.send({ name: 'change_device', data })
                }
            }
        }, {
            initParams
        })
    })
}

const getDeviceWebSocket = () => {
    return deviceWebSocket;
}

export default {
    initDeviceWebSocket, getDeviceWebSocket
}


