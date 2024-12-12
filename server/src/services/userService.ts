import { Request, Response } from 'express';
import api from '../api/index'
import { storeKeyValue, getKeyValue } from '../utils/tools';
import { EUserStatus } from '../model/user';
import websocket from '../websocket';

export const loginService = async (req: Request) => {
    try {
        const response = await api.login.login(req.body);
        const { error, data } = response;
        console.log('response', response);
        if (error == 0) {
            const { at, user: { apikey } } = data!;
            storeKeyValue('user', 'at', at);
            storeKeyValue('user', 'apikey', apikey);
        }
        return response;

    } catch (error) {
        console.log(error);
    }
};

export const userStatusService = async () => {
    try {
        const at = getKeyValue('user', 'at');
        const userStatus = !!at ? EUserStatus.LOGGED : EUserStatus.NOTLOGGED;
        return {
            error: 0,
            msg: '',
            data: {
                userStatus
            }
        };

    } catch (error) {
        console.log(error);
    }
};