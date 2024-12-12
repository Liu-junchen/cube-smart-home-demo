import express from 'express';
import userRouter from './user';
import deviceRouter from './device';
import dispatchServerRouter from './dispatchServer';
import syncDeviceRouter from './syncDevice';
import sseRouter from './sse';
import websocket from './websocket';

const router = express.Router();

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/dispatch', dispatchServerRouter);
router.use('/sync', syncDeviceRouter);
router.use('/sse', sseRouter);
router.use('/websocket', websocket);

export default router;