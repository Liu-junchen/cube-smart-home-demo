import express from 'express';
import userRouter from './user';
import deviceRouter from './device';
import dispatchServerRouter from './dispatchServer';

const router = express.Router();

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/dispatch', dispatchServerRouter);

export default router;