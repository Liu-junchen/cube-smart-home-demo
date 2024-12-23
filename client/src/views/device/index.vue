<template>
    <div class="device-list">
        <DeviceCard v-for="item in deviceStore.deviceList" :key="item.deviceid" :info="item" />
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useDeviceStore } from '@/store/device';
import DeviceCard from './components/DeviceCard.vue';

const deviceStore = useDeviceStore();
onMounted(() => {
})
</script>
<style lang="scss" scoped>
.device-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 40px;
    margin-top: 107px;
}
</style>
