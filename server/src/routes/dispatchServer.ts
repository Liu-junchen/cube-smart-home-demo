import express from 'express';
const router = express.Router();
import { dispatchServerController } from '../controllers/dispatchServerController';

router.get('/app', async (req, res) => {
    try {
        const result = await dispatchServerController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});

export default router;