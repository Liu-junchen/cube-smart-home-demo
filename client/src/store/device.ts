
import { defineStore } from 'pinia';
import type { IDevice, IDeviceData, IDeviceParams, IDeviceState }from '@/model/device';
import { EItemType }from '@/model/device';
import api from '@/api';
import _ from 'lodash';

export const useDeviceStore = defineStore('device', {
    state: (): IDeviceState => {
        return {
            /** thing列表 */
            thingList: [],
        }
    },
    actions: {
        /** 获取 thing 列表 */
        async getThingList() {
            const { error, data, msg } = await api.device.getThingList({ lang: 'cn' });
            if (error === 0) {
                this.thingList = data?.thingList;
            }
        },
        updateDeviceStatus(deviceid: string, params: IDeviceParams) {
            const thisDeviceParams = (this.thingList as IDeviceData[]).find(item => deviceid === item.itemData.deviceid)?.itemData.params;
            _.assign(thisDeviceParams, params);
        }
    },
    getters: {
        /** 返回 thing列表中所有的单通道和多通道设备 */
        deviceList(): IDevice[] | [] {
            const deviceList = this.thingList?.filter((thing) => {
                const { itemType, itemData } = thing;
                return itemType === EItemType.OwnDeviceInOwnFamily && (itemData as IDevice)?.extra?.uiid === 3;
            }).map(deviceThing => deviceThing.itemData);
            return deviceList as IDevice[] | [];
        }
    },
    persist: true,
},)