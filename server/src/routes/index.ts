import express from 'express';
import userRouter from './user';
import deviceRouter from './device';

const router = express.Router();

router.use('/user', userRouter);
router.use('/device', deviceRouter);

export default router;