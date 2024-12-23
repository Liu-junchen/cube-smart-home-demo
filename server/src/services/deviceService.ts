import { Request, Response } from 'express';
import api from '../api/index';
import { EItemType, ISwitchConfig, type IDevice } from '../model/device';
import websocket from '../websocket';
import { v4 } from 'uuid';
import sseServer from '../utils/sse/sseServer';
import { deviceChangeSyncToIHost } from '../websocket/device';
import { getKeyValue } from '../utils/tools';

/** 获取设备列表 */
export const getDeviceListService = async (req: Request) => {
    try {
        // 获取 thing 列表
        const { error, msg, data } = await api.device.getThingList(req.body);
        if (error === 0) {
            const { thingList } = data ?? {};
            // 过滤 thingList 中为 uiid 为 4 的开关类设备，组成新的列表
            const deviceList = thingList?.filter((thing) => {
                const { itemType, itemData } = thing;
                return itemType === EItemType.OwnDeviceInOwnFamily && (itemData as IDevice)?.extra?.uiid === 4;
            }).map(deviceThing => deviceThing.itemData);

            // 判断该设备的同步 iHost 状态
            if (getKeyValue('iHost', 'token')) {
                const result = await api.iHost.getIHostDevices();
                const iHostDeviceList = result.data!.device_list;
                (deviceList as IDevice[])?.forEach((device) => {
                    const synced = iHostDeviceList.some((iHostDevice) =>
                        iHostDevice.tags?.deviceid === device.deviceid
                    )
                    device.synced = synced;
                })
            }
            return {
                error, msg, data: { deviceList }
            };
        } else {
            return { error, msg, data }
        }
    } catch (error) {
        console.log(error);
    }
};

/** demo 更改设备状态 */
export const deviceChangeService = async (req: Request) => {
    try {
        const { deviceid, params } = req.body;
        const ws = websocket.getDeviceWebSocket();
        // 通过 websocket 发送消息给云端，更改设备状态
        ws?.send('update', {
            deviceid, params
        });
        // 是否获取了 token，没获取过说明设备没有同步至 iHost
        if (getKeyValue('iHost', 'token')) {
            // 同时同步给 ihost 设备更新
            deviceChangeSyncToIHost(deviceid, params);
        }
        return {
            error: 0,
            msg: '',
            data: {}
        }
    } catch (error) {
        console.log('error', error);
    }
};

/** iHost 更改设备状态 */
export const deviceChangeByIHostService = async (req: Request) => {
    try {
        const deviceid = req.params.deviceid;
        const state = req.body.directive.payload.state;
        let switches: ISwitchConfig[] = [];
        if (state.power) {
            switches = new Array(4).fill(undefined).map((_, index) => {
                return {
                    switch: state.power.powerState,
                    outlet: index
                };
            });
        } else if (state.toggle) {
            switches = Object.entries(state.toggle).map(([key, value]: any) => {
                return {
                    switch: value.toggleState,
                    outlet: parseInt(key, 10) - 1
                };
            });
        }
        console.log('switches', switches);
        

        const ws = websocket.getDeviceWebSocket();
        // 通过 websocket 发送消息给云端，更改设备状态
        ws?.send('update', {
            deviceid, params: { switches }
        });
        // 同时 通过 sse 告诉 demo 前端状态改变了
        sseServer.send({ name: 'change_report', data: { deviceid, params: { switches } } });

        return {
            event: {
                header: {
                    name: "UpdateDeviceStatesResponse",
                    message_id: v4(),
                    version: "2"
                },
                payload: {}
            }
        }
    } catch (error) {
        console.log(error)
    }
};