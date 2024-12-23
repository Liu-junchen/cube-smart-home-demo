import sseServer from "../utils/sse/sseServer";
import { SSEClient } from "../utils/sse/sseClient";

let sseClent: SSEClient | null = null;
// 初始化 与 iHost 服务端的 sse 链接
const initSSEClient = async () => {
    return new Promise(async (resolve, reject) => {
        sseClent = new SSEClient(`http://192.168.5.215/api/v1/sse/bridge?id=${Date.now()}`, {
            onConnectSuccess: () => {
                console.log('与 iHost 服务的 sse 建立成功连接了');
                resolve(true);
            },
            onConnectError: (err: any) => {
                console.log('与 iHost 服务的 sse 连接失败了');
                reject(err);
            }
        })
        sseClent.subscribe('delete_report', (data) => {
            const { thing_data: thingData } = data ?? {};
            const { deviceid } = thingData?.tags ?? {};
            console.log('deviceid', deviceid);
            
            sseServer.send({ name: 'delete_report', data: { deviceid, params: { deleted: true } } });
        })
    })
}

const getSSEClent = () => {
    return sseClent;
}

export default {
    initSSEClient, getSSEClent
}
