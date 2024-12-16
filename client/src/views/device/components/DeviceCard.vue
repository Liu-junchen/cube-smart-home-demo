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
                    <a-switch :checked="item.switch === ESwitchStatus.ON" @click="handleDeviceStatusChange" />
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script setup lang="ts">
import { type IDevice, ESwitchStatus } from '@/model/device';
import { ref, computed } from 'vue';

const props = defineProps<{
    info: IDevice,
}>();

let visible = ref(false)

const switches = computed(() => {
    const { params } = props.info ?? {};
    const switches = params?.switches;
    return switches?.filter((item, index) => index !== switches.length - 1);
})

const handleDeviceClick = () => {
    visible.value = true
}

const handleDeviceStatusChange = (checked: boolean) => {
    console.log('checked', checked);
    
}
</script>
<style lang="scss">
.device-control {
    .ant-modal-content .device-control-item {
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