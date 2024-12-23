import { Socket } from "./socket";
import WebSocket from 'ws';

/**
 * 初始化 websocket 连接
 */
export class DeviceSocket {
    private ws?: Socket;
    private heartbeatTimer?: ReturnType<typeof setInterval> | null;;

    constructor(
        url: string,
        {
            onConnectSuccess,
            onConnectError,
            onMessage,
            onConnectClose,
        }: {
            onConnectSuccess: Function;
            onConnectError: Function;
            onMessage?: Function;
            onConnectClose?: Function;
        },
        {
            initParams,
        }: {
            initParams: Function;
        }
    ) {
        this.ws = new Socket(
            url,
            () => {
                console.log('连接上了');
                onConnectSuccess();
            },
            () => {
                console.log('连接出现了异常');
                onConnectError();
            },
            () => { 
                console.log('连接关闭了');
                onConnectClose?.();
            },
            initParams,
        );
        this.ws.message(({ data: dataStr }: { data: string }) => {
            let data;
            try {
                data = JSON.parse(dataStr);
            } catch (error) {
                data = dataStr
            } finally {
                if (onMessage) {
                    onMessage(data);
                    return;
                }
            }
        });
    }

    async send(action: string, params?: object) {
        console.log(' / send message(), action, params :', action, params);
        this.ws!.send(action, params);
    }

    public async startHeartbeat(heartBeatInterval = 97) {
        this.heartbeatSend();
        this.heartbeatTimer = setInterval(() => {
            this.heartbeatSend();
        }, (heartBeatInterval - 7) * 1000);
    }

    private heartbeatSend() {
        if (this.ws && this.ws.ws?.readyState === WebSocket.OPEN) {
            const heartbeatMsg = "ping";
            this.ws.ws.send(heartbeatMsg);
        }
    }

    public destroy() {
        this.ws!.destroy();
    }
}