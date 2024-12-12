import { Request, Response } from 'express';
import { loginService, userStatusService } from '../services/userService';

export const loginController = async (req: Request, res: Response) => {
    try {
        const result = await loginService(req);
        return result
    } catch (error) {
    }
};

export const userStatusController = async (req: Request, res: Response) => {
    try {
        const result = await userStatusService();
        return result
    } catch (error) {
    }
};