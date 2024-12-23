import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

// sse 接口连接池
interface ISendEvent {
    /** Event name e.g.：change_report */
    name: string;
    /**Time data e.g. {device data} */
    data: any;
}

const ssePool = new Map();
class ServerSendStream {
    public connectionId: string;
    private retryInterval: number;
    // public eventStream: PassThrough;
    private heartbeat: ReturnType<typeof setTimeout> | null;
    private req: Request;
    private res: Response;

    constructor(req: Request, res: Response) {
        this.connectionId = uuid();
        this.retryInterval = 20 * 1000;
        this.heartbeat = null;
        this.req = req;
        this.res = res;
        this.configureLifecycle();
    }
    configureLifecycle() {
        this.res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'Connection': 'keep-alive'
        });

        this.heartbeat = setInterval(() => {
            this.res.write(`data:\n\n`);
        }, this.retryInterval);
        this.req.on('close', () => {
            ssePool.delete(this.connectionId);
            clearInterval(this.heartbeat!);
            console.log('sse connection close');
        });
        this.req.on('finish', () => {
            ssePool.delete(this.connectionId);
            clearInterval(this.heartbeat!);
            console.log('sse connection finish');
        });
        this.req.on('error', () => {
            ssePool.delete(this.connectionId);
            clearInterval(this.heartbeat!);
            console.log('sse connection error');
        });
        this.res.write(`retry: ${this.retryInterval}\n\n`);
    }
    publish(event: any) {
        const formattedData = typeof event.data === 'string' ? event.data : JSON.stringify(event.data);
        const payload = `event: ${event.name}\ndata: ${formattedData}\n\n`;
        this.res.write(payload);
    }
}

function buildStreamContext(req: Request, res: Response) {
    const stream = new ServerSendStream(req, res);
    ssePool.set(stream.connectionId, stream);
    console.log(`sse connections count:${ssePool.size}`);
}

/**
 *
 * @param {object} event
 * @param {String} event.name  Event name For example: change_report
 * @param {Object} event.data  Time data e.g. {device data}
 */
function send(event: ISendEvent) {
    //broadcast data
    for (const entry of ssePool.entries()) {
        const sse = entry[1];
        try {
            console.log(`connectionId:${entry[0]} - data:${JSON.stringify(event)}`);
            sse.publish(event);
        } catch (error) {
            console.log(`sse connectionId:${sse.connectionId} send event:${JSON.stringify(event)} error:${error}`);
        }
    }
}


export default {
    buildStreamContext,
    send,
};
