import { Socket } from "./socket";

/**
 * 初始化 websocket 连接
 */
export class DeviceSocket {
    private ws?: Socket;

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
            () => { },
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
}