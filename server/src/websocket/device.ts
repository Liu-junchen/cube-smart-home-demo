import api from '../api/index';

/** 更改设备状态同步到 iHost  */
export const deviceChangeSyncToIHost = async (deviceid: string, switches: any) => {
    try {
        // 首先我们获取一下 ihost 的设备列表
        const result = await api.iHost.getIHostDevices();
        const deviceList = result.data!.device_list;
        const serial_number = deviceList.find((item: any) => item.tags?.deviceid === deviceid)?.serial_number;
        
        const state: any = {
            toggle: {}
        };
        switches.forEach((item: { switch: string, outlet: number }) => {
            state.toggle[item.outlet + 1] = {
                toggleState: item.switch
            }
        })
        
        const params = {
            event: {
                header: {
                    name: "DeviceStatesChangeReport",
                    message_id: "Unique identifier, preferably a version 4 UUID",
                    version: "2"
                },
                endpoint: {
                    serial_number,
                    third_serial_number: deviceid,
                },
                payload: {
                    state
                }
            }
        }
        const res = await api.iHost.syncDevice(params);
        console.log('res', res);
        
    } catch (error) {
        console.log(error);
        
    }
};