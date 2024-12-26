import { setTimeoutPromise } from '../tools';
import { EventSource } from 'eventsource';

export class SSEClient {
    private url!: string;
    private eventSource: EventSource | null = null;
    private eventListeners: { [eventName: string]: ((data: any) => void)[] } = {};

    private onConnectSuccess?: Function;
    private onConnectError?: Function;

    private HEARTBEAT_INTERVAL = 20*1000;

    /** 是否在重连中 */
    private isReconnecting = false;

    /** 是否手动关闭中 */
    private isClosing = false;

    private reconnectTimer!: ReturnType<typeof setTimeout>;

    /** 上一次收到心跳消息的时间戳 */
    private heartbeatTimestamp = Date.now();
    private checkHeartbeatTimer!: ReturnType<typeof setInterval>;

    constructor(url: string, { onConnectSuccess, onConnectError }: {
        onConnectSuccess?: Function;
        onConnectError?: Function;
        onMessage?: Function;
    }) {
        this.url = url;
        this.connect();
        this.onConnectSuccess = onConnectSuccess;
        this.onConnectError = onConnectError;
    }

    private connect() {
        try {
            this.eventSource = new EventSource(this.url);
            // 监听连接打开事件
            this.eventSource.onopen = () => {
                this.onConnectSuccess?.();
                console.log('SSE connection opened');
            };
            // 监听连接错误事件
            this.eventSource.onerror = (error) => {
                this.onConnectError?.();
                console.error('SSE connection error:', error);
                // 如果不是手动关闭连接，触发重连
                if(!this.isClosing) {
                    this.reconnect()
                }
            };

            this.eventSource.onmessage = () => {
                this.heartbeatTimestamp = Date.now();
                console.log('收到 iHost 服务发送过来的心跳了', this.heartbeatTimestamp);
            };

            // 开始进行心跳检测
            this.startCheckHeartbeatTimer()
        } catch (error) {
            console.error('Failed to create EventSource:', error);
        }
    }

    // 订阅特定事件
    subscribe(eventName: string, callback: (data: any) => void) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(callback);
        this.eventSource?.addEventListener(eventName, (event) => {
            callback(JSON.parse(event.data))
        });
    }

    // 取消订阅特定事件
    unsubscribe(eventName: string, callback: (data: any) => void) {
        const listeners = this.eventListeners[eventName];
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    // 关闭SSE连接
    close() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
            this.isClosing = true;
            console.log('SSE connection closed');
        }
    }


    // 定时监测心跳消息
    async startCheckHeartbeatTimer() {
        // 延迟一段时间后开启定时器，是为了防止检测时刻和心跳到来的时刻重叠带来的问题
        await setTimeoutPromise(this.HEARTBEAT_INTERVAL / 2);
        clearInterval(this.checkHeartbeatTimer as ReturnType<typeof setInterval>);
        this.checkHeartbeatTimer = setInterval(() => {
            const heartbeatTimeout = Date.now() - this.heartbeatTimestamp > this.HEARTBEAT_INTERVAL;
             // 如果心跳消息接收超时并且不是被用户手动关闭的情况下，触发重连
            if (heartbeatTimeout && !this.isClosing) {
                console.warn('heartbeat timeout! start reconnect!');
                this.close();
                this.reconnect();
            }
        }, this.HEARTBEAT_INTERVAL);
    }

    public reconnect() {
        if (this.isReconnecting) {
            return;
        }

        this.isReconnecting = true;
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => {
            this.connect();
            this.isReconnecting = false;
        }, 5000);
    }
}