// 定义ISendEvent接口，与后端保持一致
interface ISendEvent {
    name: string;
    data: any;
}

export class SSEClient {
    private eventSource: EventSource | null = null;
    private eventListeners: { [eventName: string]: ((data: any) => void)[] } = {};

    private onConnectSuccess?: Function;
    private onConnectError?: Function;

    constructor(url: string, { onConnectSuccess, onConnectError }: {
        onConnectSuccess?: Function;
        onConnectError?: Function;
        onMessage?: Function;
    }) {
        this.connect(url);
        this.onConnectSuccess = onConnectSuccess;
        this.onConnectError = onConnectError;
    }

    private connect(url: string) {
        try {
            this.eventSource = new EventSource(url);
            // 监听连接打开事件
            this.eventSource.onopen = () => {
                this.onConnectSuccess?.();
                console.log('SSE connection opened');
            };
            // 监听连接错误事件
            this.eventSource.onerror = (error) => {
                this.onConnectError?.();
                console.error('SSE connection error:', error);
            };
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
            console.log('SSE connection closed');
        }
    }
}