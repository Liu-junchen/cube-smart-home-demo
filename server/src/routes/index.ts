import express from 'express';
import userRouter from './user';
import deviceRouter from './device';
import dispatchServerRouter from './dispatchServer';
import syncDeviceRouter from './syncDevice';

const router = express.Router();

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/dispatch', dispatchServerRouter);
router.use('/sync', syncDeviceRouter);

export default router;