import { setTimeoutPromise } from '../tools'

export class Socket {
    private url: string;
    private isDestroying: boolean;
    private isReconnecting: boolean;
    private reconnectTimer: any;

    private ws: WebSocket | null;
    private openFn?: any;
    private errorFn?: any;
    private closeFn?: any;

    private initParams?: any;
    private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
    /** 心跳检测时间 */
    private HEARTBEAT_INTERVAL: number = 10000;

    constructor(url: string, openFn?: any, errorFn?: any, closeFn?: any, initParams?: Function) {
        this.url = url;
        this.isDestroying = false;
        this.isReconnecting = false;
        this.reconnectTimer = 0;

        this.ws = null;
        this.openFn = openFn;
        this.errorFn = errorFn;
        this.closeFn = closeFn || errorFn;

        this.initParams = initParams;

        this.connect();
    }

    /**
     * 内部在使用的方法们
     */
    public connect() {
        console.log('[Socket] connect');
        this.ws = new WebSocket(this.url);
        this.onOpen(this.openFn);
        this.onError(this.errorFn);
        this.onClose(this.closeFn);

        // 开始心跳检测
        this.startHeartbeat();
    }
    public onError(fn: any) {
        this.ws!.onerror = (...args: any[]) => {
            console.log('[Socket] onerror');
            fn && fn.call(this, ...args);
            if (!this.isDestroying) {
                this.reconnect();
            }
        };
    }
    public onClose(fn: any) {
        this.ws!.onclose = (...args: any[]) => {
            console.log('[Socket] onclose');
            fn && fn.call(this, ...args);
            if (!this.isDestroying) {
                this.reconnect();
            }
            return true;
        };
    }
    public onOpen(fn: any) {
        this.ws!.onopen = (...args: any[]) => {
            console.log('[Socket] onopen');
            fn && fn.call(this, ...args);
        };
    }
    // 重连
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

    public async startHeartbeat() {
        // 每10秒（10000毫秒）发送一次心跳消息
        this.heartbeatTimer = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                const heartbeatMsg = "ping";
                this.ws.send(heartbeatMsg);
            }
        }, this.HEARTBEAT_INTERVAL);
    }

    /**
     * 外部在使用的方法们
     */

    // 发送消息
    public send(action: string, paramObj?: object) {
        const msg = this.initParams(action, paramObj);
        this.ws!.send(msg);
    }
    // 接收消息
    public message(fn: any) {
        this.ws!.onmessage = (...args: any[]) => {
            fn && fn.call(this, ...args);
            return args[0];
        };
    }

    // 销毁
    public destroy() {
        console.log('[Socket] destroy');
        this.isDestroying = true;
        this.ws!.close();
    }
}
