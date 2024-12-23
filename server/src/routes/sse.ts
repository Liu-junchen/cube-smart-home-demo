import express from 'express';
import type { Request, Response } from 'express';
const router = express.Router();
import sseServer from '../utils/sse/sseServer';
import sseClient from '../sse';

/** 后端接口支持 sse */
router.get('/bridge', (req: Request, res: Response) => {
    sseServer.buildStreamContext(req, res)
});

router.post('/init', async(req: Request, res: Response) => {
    await sseClient.initSSEClient();
    res.status(200).json({
        error: 0,
        msg: '',
        data: {}
    })
})

export default router;