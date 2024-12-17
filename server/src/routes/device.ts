import express from 'express';
const router = express.Router();
import { deviceController } from '../controllers/deviceController';

router.get('/thing', async (req, res) => {
    try {
        const result = await deviceController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});

export default router;