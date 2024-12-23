import { Request, Response } from 'express';
import { getDeviceListService, deviceChangeService, deviceChangeByIHostService } from '../services/deviceService';

export const getDeviceListController = async (req: Request, res: Response) => {
    try {
        const result = await getDeviceListService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const deviceChangeController = async (req: Request, res: Response) => {
    try {
        const result = await deviceChangeService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const deviceChangeByIHostController = async (req: Request, res: Response) => {
    try {
        const result = await deviceChangeByIHostService(req);
        return result
    } catch (error) {
        console.log(error);
    }
};