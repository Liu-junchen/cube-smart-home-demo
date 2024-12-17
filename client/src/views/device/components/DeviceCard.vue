<template>
    <div class="device-card">
        <div class="device-card__container" @click="handleDeviceClick">
            <div class="device-card__container__name">
                {{ info.name }}
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
                    <a-switch :checked="item.switch === ESwitchStatus.ON" @click="(checked: boolean) => handleDeviceStatusChange(checked, item.outlet)" />
                </div>
            </div>
            <div class="offline-mask" v-if="!info.online">
                <div class="tip">设备离线</div>
                <div class="check">
                    <div class="check-title">请检查：</div>
                    <div class="check-item"><span >设备是否通电</span></div>
                    <div class="check-item"><span >路由器是否连接外部网络</span></div>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script setup lang="ts">
import { type IDevice, type ISwitchConfig, ESwitchStatus } from '@/model/device';
import { ref, computed } from 'vue';
import { useWebSocketStore } from '@/store/websocket';
import { useDeviceStore } from '@/store/device';

const deviceStore = useDeviceStore();
const websocketStore = useWebSocketStore();

const props = defineProps<{
    info: IDevice,
}>();

let visible = ref(false);

const params = computed(() => props.info?.params)

const switchesInInfo = computed(() => {
    return params.value?.switches;
})

const switches = computed(() => {
    return switchesInInfo.value?.filter((item, index) => index !== switchesInInfo.value!.length - 1);
})

const handleDeviceClick = () => {
    visible.value = true
}

const handleDeviceStatusChange = (checked: boolean, outlet: number) => {
    const switches: ISwitchConfig[] = switchesInInfo.value!.map(item => {
        if (item.outlet === outlet) {
            return { ...item, switch: checked ? ESwitchStatus.ON : ESwitchStatus.OFF }
        } else {
            return item;
        }
    });
    websocketStore.setDeviceStatus(props.info.deviceid, { switches })
    deviceStore.updateDeviceStatus(props.info.deviceid, { ...params.value, switches } as any)
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