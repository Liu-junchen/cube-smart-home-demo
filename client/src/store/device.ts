
import { defineStore } from 'pinia';
import type { IDevice, IDeviceData, IDeviceParams, IDeviceState } from '@/model/device';
import api from '@/api';
import _ from 'lodash';

export const useDeviceStore = defineStore('device', {
    state: (): IDeviceState => {
        return {
            /** 设备列表 */
            deviceList: [],
        }
    },
    actions: {
        /** 获取 thing 列表 */
        async getDeviceList() {
            const { error, data, msg } = await api.device.getDeviceList({ lang: 'cn' });
            if (error === 0) {
                this.deviceList = data!.deviceList;
            }
        },
        updateDeviceSwitchesStatus(deviceid: string, params: IDeviceParams) {
            const thisDevice = this.deviceList.find(item => deviceid === item.deviceid);
            
            if (!thisDevice) return;
            // 上报了按钮信息时
            if (params.switches) {
                const thisDeviceSwitches = thisDevice?.params?.switches;
                params.switches?.forEach(({ outlet: paramsSwitchOutlet, switch: paramsSwitch }) => {
                    const thisDeviceSwitchItem = thisDeviceSwitches?.find(({ outlet: thisDeviceSwitch }) => paramsSwitchOutlet === thisDeviceSwitch);
                    thisDeviceSwitchItem!.switch = paramsSwitch;
                })
            }

            // 上报了在线情况信息时
            if (params.online !== undefined) {
                thisDevice.online = params.online;
            }
        },
    },
    persist: true,
},)