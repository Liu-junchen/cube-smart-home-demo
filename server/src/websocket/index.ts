import { getKeyValue, createNonce, getModuleValue } from "../utils/tools";
import { DeviceSocket } from "../utils/websocket";
import api from "../api";
import { deviceChangeSyncToIHost } from './device'
import sseServer from '../utils/sse/sseServer';

/** 初始化 websocket 的发送消息参数 */
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
    return new Promise(async (resolve, reject) => {
        const { at, apikey } = getModuleValue('user') ?? {};
        if (!at || !apikey) return;
        const { domain, port } = await api.dispatchServer.dispatchServer();
        const url = `wss://${domain}:${port}/api/ws`;
        console.log('url', url);

        if (deviceWebSocket) deviceWebSocket.destroy();

        deviceWebSocket = new DeviceSocket(url, {
            onConnectSuccess: () => {
                resolve(true);
                userOnline();
            },
            onConnectError: (err: any) => {
                reject(err);
            },
            onMessage: (data: any) => {
                console.log('websocket 接收到的消息 =>', data);
                if (data.config) {
                    const { hb = 1, hbInterval = 97 } = data.config;
                    hb && deviceWebSocket?.startHeartbeat(hbInterval);
                }
                if (data.action === 'update' || data.action === 'sysmsg') {
                    const { deviceid, params } = data;
                    deviceChangeSyncToIHost(deviceid, params);
                    sseServer.send({ name: 'change_report', data })
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


