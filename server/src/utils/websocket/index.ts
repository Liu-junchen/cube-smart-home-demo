import { Socket } from "./socket";
import WebSocket from 'ws';
import EE from '../eventEmitter'

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
                console.log('websocket 连接上了');
                onConnectSuccess();
            },
            () => {
                console.log('websocket 连接出现了异常');
                onConnectError();
            },
            () => {
                console.log('websocket 连接关闭了');
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
        await this.heartbeatSend();
        this.heartbeatTimer = setInterval(async () => {
            await this.heartbeatSend();
        }, (heartBeatInterval - 7) * 1000);
    }

    private waitForPingPang() {
        const maxTime = 1000 * 5;
        let timer: NodeJS.Timeout | null = null;
        return new Promise((resolve) => {
            // 超出规定心跳时间进行重连
            timer = setTimeout(async () => {
                // 重试连接
                console.log(`心跳时间超出了，进行重连`);
                this.ws?.reconnect();
                resolve(false);
            }, maxTime);

            // 接收到消息则不进行重连
            EE.once('pingpong', () => {
                console.log('websocket 心跳正常收到');
                // 清除重连定时器
                timer && clearTimeout(timer);
                resolve(true);
            });
        });
    }

    private async heartbeatSend() {
        if (this.ws && this.ws.ws?.readyState === WebSocket.OPEN) {
            const heartbeatMsg = "ping";
            this.ws.ws.send(heartbeatMsg);
            await this.waitForPingPang();
        }
    }

    public destroy() {
        this.ws!.destroy();
    }
}