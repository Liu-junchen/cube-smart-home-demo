import express from 'express';
import type { Request, Response } from 'express';
const router = express.Router();
import sse from '../utils/sse';

router.get('/bridge', async (req: Request, res: Response) => {
    sse.buildStreamContext(req, res)
});

export default router;