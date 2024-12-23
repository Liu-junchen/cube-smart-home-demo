import { Request, Response } from 'express';
import { syncDeviceService, deleteSyncDeviceService } from '../services/syncDeviceService';

export const syncDeviceController = async (req: Request, res: Response) => {
    try {
        const result = await syncDeviceService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};
export const deleteSyncDeviceController = async (req: Request, res: Response) => {
    try {
        const result = await deleteSyncDeviceService(req, res);
        return result
    } catch (error) {
        console.log(error);
    }
};