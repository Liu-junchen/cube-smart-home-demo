import { setTimeoutPromise } from '../tools';
import { Socket } from "./socket";
import { EventBus } from './event-bus';

// /** websocket 实例 */
// let ws: WebSocket | null = null;
// /** 心跳定时时间，每20s一次 */
// const HEARTBEAT_INTERVAL = 20000;
// /** 上一次接收到心跳的时间戳 */
// let heartbeatTimestamp = Date.now();
// /** 心跳检测定时器 */
// let checkHeartbeatTimer: ReturnType<typeof setInterval>;

/**
//  * 定时检测是否收到心跳信息
//  */
// async function startCheckHeartbeatTimer() {
//     // 延迟一段时间后开启定时器，是为了防止检测时刻和心跳到来的时刻重叠带来的问题
//     await setTimeoutPromise(HEARTBEAT_INTERVAL / 2);
//     clearInterval(checkHeartbeatTimer);
//     checkHeartbeatTimer = setInterval(() => {
//         const heartbeatTimeout = Date.now() - heartbeatTimestamp > HEARTBEAT_INTERVAL;
//         if (heartbeatTimeout) {
//             console.warn('heartbeat timeout! start reconnect!');
//             closeSse();
//             useDisconnect().startReconnect();
//         }
//     }, HEARTBEAT_INTERVAL);
// }

/**
 * 初始化 websocket 连接
 */
export class DeviceSocket {
    private ws?: Socket;
    private eventBus: EventBus;

    constructor(
        url: string,
        {
            onConnectSuccess,
            onConnectError,
            onMessage,
        }: {
            onConnectSuccess: Function;
            onConnectError: Function;
            onMessage?: Function;
        },
        {
            initParams,
        }: {
            initParams: Function;
        }
    ) {
        this.eventBus = new EventBus();
        this.ws = new Socket(
            url, 
            () => {
                console.log('连接上了)');
                onConnectSuccess();
            },
            () => {
                console.log('连接断了)');
                onConnectError();
            },
            () => {},
            initParams,
        );
        this.ws.message(({ data: dataStr } : { data: string }) => {
            const data: any = JSON.parse(dataStr);
            const { action } = data;
            const resolve = (res: any) => this.eventBus.$emit(action, res);
            const reject = (e: any) => this.eventBus.$emit(action, 'isMessageRejected', e);
            // console.log(' receive message(), action, data :', action, data);

            // const param = {
            //     data,
            //     resolve,
            //     reject,
            // };

            // // 监听 ukey 插拔事件
            // if (isUkeyPlugged(param)) {
            //     onPlugged();
            //     return;
            // }
            // if (isUkeyUnplugged(param)) {
            //     onUnplugged();
            //     return;
            // }

            // 自定义处理
            if (onMessage) {
                onMessage(data);
                return;
            }

            // // 默认处理
            // if (result) {
            //     resolve(result);
            // } else {
            //     reject(error);
            // }
            console.log('data', data);
            
        });

    }

    async send(action: string, params?: object) {
        console.log(' / send message(), action, params :', action, params);
        return new Promise<any>((resolveSend, rejectSend) => {
            this.ws!.send(action, params);
            this.eventBus.$once(action, (res: any, err?: any) => {
                if (res === 'isMessageRejected') {
                    rejectSend(err);
                    return;
                }
                resolveSend(res);
            });
        });
    }

}