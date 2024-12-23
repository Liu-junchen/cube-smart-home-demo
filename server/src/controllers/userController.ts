import { Request, Response } from 'express';
import { loginService, userStatusService, logoutService } from '../services/userService';

export const loginController = async (req: Request, res: Response) => {
    try {
        const result = await loginService(req);
        return result
    } catch (error) {
    }
};

export const userStatusController = (req: Request, res: Response) => {
    try {
        const result = userStatusService();
        return result
    } catch (error) {
    }
};

export const logoutController = (req: Request, res: Response) => {
    try {
        const result = logoutService();
        return result
    } catch (error) {
    }
};