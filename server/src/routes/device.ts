import express from 'express';
const router = express.Router();
import { deviceChangeController, getDeviceListController, deviceChangeByIHostController } from '../controllers/deviceController';

router.get('/list', async (req, res) => {
    try {
        const result = await getDeviceListController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});

router.post('/change', async (req, res) => {
    try {
        const result = await deviceChangeController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});

router.post('/:deviceid', async (req, res) => {
    try {
        const result = await deviceChangeByIHostController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});

export default router;