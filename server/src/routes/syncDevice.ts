import express from 'express';
const router = express.Router();
import { syncDeviceController, deleteSyncDeviceController } from '../controllers/syncDeviceController';

router.post('/device', async (req, res) => {
    try {
        const result = await syncDeviceController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});

router.delete('/device', async (req, res) => {
    try {
        const result = await deleteSyncDeviceController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});
export default router;