<template>
    <div class="device-card">
        <div class="device-card-container">
            <div class="device-card-container__name">
                {{ info.name }}
            </div>
            <div class="device-card-container__sync">
                <a-button type="link" @click.stop="handleSyncClick">
                    {{ syncOperateDesc }}
                </a-button>
            </div>
            <div class="device-card-container__desc">
                {{ info.extra.ui }}
            </div>
            <div class="device-card-container__control">
                <div class="device-card-container__control-item" v-for="item in switches">
                    <div class="device-card-container__control-item__name">
                        通道{{ item.outlet + 1 }}
                    </div>
                    <div class="device-card-container__control-item__switch">
                        <a-switch :checked="item.switch === ESwitchStatus.ON"
                            @click="(checked: boolean) => handleDeviceStatusChange(checked, item.outlet)" />
                    </div>
                </div>
            </div>
            <div class="offline-mask" v-if="!info.online">
                <div class="tip">设备离线</div>
                <div class="check">
                    <div class="check-title">请检查：</div>
                    <div class="check-item"><span>设备是否通电</span></div>
                    <div class="check-item"><span>路由器是否连接外部网络</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type IDevice, type ISwitchConfig, ESwitchStatus } from '@/model/device';
import { ref, computed, h } from 'vue';
import { useDeviceStore } from '@/store/device';
import { useEtcStore } from '@/store/etc';
import api from '@/api';
import { message, Modal } from 'ant-design-vue';

const etcStore = useEtcStore();
const deviceStore = useDeviceStore();

const props = defineProps<{
    info: IDevice,
}>();

const params = computed(() => props.info?.params)

const isDeviceUnSync = computed(() => {
    return !props.info.synced;
})

const syncOperateDesc = computed(() => {
    return isDeviceUnSync.value ? '同步' : '取消同步';
})

const switches = computed(() => {
    return params.value?.switches;
})

const handleSyncClick = async () => {
    try {
        etcStore.loading = true;
        // 还未同步时去同步
        if (isDeviceUnSync.value) {
            const { error } = await api.syncDevice.syncDevice(props.info);
            // error 为 401 时，需要在 iHost 页面确认授权 token
            if (error === 401) {
                Modal.confirm({
                    content: '请到 iHost 页面中确认授权 token，授权完成之后回到此页面再次点击同步',
                })
                return
            }
            message.success('同步成功');
            // 刷一下设备列表
        } else {
            // 已经同步了，去取消同步
            await api.syncDevice.cancelSyncDevice(props.info);
        }
        // 结束后刷一下设备列表
        await deviceStore.getDeviceList();
    } catch (err) {
        console.log(err);
    } finally {
        etcStore.loading = false
    }
}

const handleDeviceStatusChange = (checked: boolean, outlet: number) => {
    const changeSwitches: ISwitchConfig[] = switches.value!.map(item => {
        if (item.outlet === outlet) {
            return { ...item, switch: checked ? ESwitchStatus.ON : ESwitchStatus.OFF }
        } else {
            return item;
        }
    });
    api.device.changeDeviceStatus({ params: { switches: changeSwitches }, deviceid: props.info.deviceid });
    deviceStore.updateDeviceStatus(props.info.deviceid, { ...params.value, switches: changeSwitches });
}
</script>
<style lang="scss">
.device-control {
    .ant-modal-content {
        position: relative;
    }
}

.device-sync {
    .ant-modal-content {
        .device-sync__footer {
            @include flex(flex-end);
        }
    }
}
</style>
<style lang="scss">
.device-card {
    position: relative;

    &-container {
        width: 325px;
        height: 170px;
        background-color: #fff;
        border-radius: 12px;
        padding: 16px;
        @include flex(space-between, _, column);
        box-shadow: 0 4px 8px #a0b8cf33, 0 6px 40px #a0b8cf30;

        &__name {
            font-size: 16px;
            font-weight: 500;
            color: #424242;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &__sync {
            text-align: right;
        }

        &__desc {
            position: absolute;
            top: 16px;
            right: 16px;
        }

        &__control {
            @include flex(space-between);
        }

        .offline-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            padding: 16px;
            background-color: #181818d9;
            border-radius: 12px;
            color: #fff;
            font-weight: 500;
        }
    }

}
</style>