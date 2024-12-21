import express from 'express';
const router = express.Router();
import { loginController, userStatusController, logoutController } from '../controllers/userController';

/** 获取用户登录状态 */
router.get('/status', (req, res) => {
    try {
        const result = userStatusController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('获取用户信息出错:', error);
        res.status(500).send('获取用户信息失败');
    }
});

/** 用户登录 */
router.post('/login', async (req, res) => {
    try {
        const result = await loginController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('登录失败:', error);
        res.status(500).send('登录失败');
    }
});

/** 用户登出 */
router.post('/logout', (req, res) => {
    try {
        const result = logoutController(req, res);
        res.status(200).json(result)
    } catch (error) {
        console.error('登出失败:', error);
        res.status(500).send('登出失败');
    }
});

export default router;