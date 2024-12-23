import express from 'express';
import type { Request, Response } from 'express';
const router = express.Router();
import websocket from '../websocket';

router.post('/init', async (req: Request, res: Response) => {
    try {
        await websocket.initDeviceWebSocket();
        res.status(200).json({
            error: 0,
            msg: '',
            data: {}
        })
    } catch (err) {
        console.log(err);
    }
});

export default router;