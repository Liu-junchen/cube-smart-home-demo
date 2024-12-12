<template>
    <div class="device-card">
        <div class="device-card__container" @click="handleDeviceClick">
            <div class="device-card__container__name">
                {{ info.name }}
            </div>
            <div class="device-card__container__sync" @click.stop="handleSyncClick">
                同步
            </div>
            <div class="device-card__container__desc">
                {{ info.extra.ui }}
            </div>
        </div>
        <a-modal v-model:visible="visible" :footer="null" style="width: 720px" :maskClosable="false"
            wrap-class-name="device-control" :title="info.name">
            <div class="device-control-item" v-for="item in switches">
                <div class="device-control-item__channel-name">
                    通道{{ item.outlet + 1 }}
                </div>
                <div class="device-control-item__switch">
                    <a-switch :checked="item.switch === ESwitchStatus.ON"
                        @click="(checked: boolean) => handleDeviceStatusChange(checked, item.outlet)" />
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
        </a-modal>
        <a-modal v-model:visible="syncVisible" :footer="null" style="width: 720px" :maskClosable="false"
            wrap-class-name="device-sync" title="请在 ihost 页面中确认获取token后点击确认">
            <div class="device-sync__footer">
                <a-button @click="handleConfrimSyncClick">
                    确认
                </a-button>
            </div>
        </a-modal>
    </div>
</template>
<script setup lang="ts">
import { type IDevice, type ISwitchConfig, ESwitchStatus } from '@/model/device';
import { ref, computed, h } from 'vue';
import { useDeviceStore } from '@/store/device';
import api from '@/api';
import { message } from 'ant-design-vue';

const deviceStore = useDeviceStore();

const props = defineProps<{
    info: IDevice,
}>();

let visible = ref(false);
let syncVisible = ref(false);

const params = computed(() => props.info?.params)

const switches = computed(() => {
    return params.value?.switches;
})

const handleSyncClick = async () => {
    const { error } = await api.syncDevice.syncDevice(props.info);
    // error 为 401 时，需要在 iHost 页面确认授权 token
    if (error === 401) {
        !syncVisible.value ? syncVisible.value = true : '';
        return false
    }

    return true;
}

const handleDeviceClick = () => {
    visible.value = true
}

const handleConfrimSyncClick = async () => {
    const isTokenVisible = await handleSyncClick();
    isTokenVisible ? syncVisible.value = false : message.error('还未在 ihost 获取 token')
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
    deviceStore.updateDeviceSwitchesStatus(props.info.deviceid, { ...params.value, switches: changeSwitches });
}
</script>
<style lang="scss">
.device-control {
    .ant-modal-content {
        position: relative;

        .offline-mask {
            position: absolute;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            height: calc(100% - 60px);
            padding: 12px 40px 0;
            background-color: #181818d9;
            border-radius: 0 0 20px 20px;
            color: #fff;
            font-weight: 500;
            z-index: 10000000;
        }

        .device-control-item {
            @include flex(space-between);
            font-size: 16px;
            box-shadow: 0 0 4px #00000026;
            border-radius: 12px;
            padding: 8px 12px;
            font-weight: 500;
            font-size: 16px;
            color: #424242;
            margin-bottom: 8px;

            &__channel-name {}
        }
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

    &__container {
        width: 170px;
        height: 170px;
        background-color: #fff;
        border-radius: 12px;
        padding: 12px 12px 8px;
        cursor: pointer;
        @include flex(space-between, center, column);
        box-shadow: 0 4px 8px #a0b8cf33, 0 6px 40px #a0b8cf30;

        &__name {
            font-size: 16px;
            font-weight: 500;
            color: #424242;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

}
</style>