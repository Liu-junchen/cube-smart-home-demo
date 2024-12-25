<template>
    <a-spin style="max-height: 100vh" size="large" :spinning="etc.loading">
        <a-layout class="layout-wrap">
            <a-layout-header :style="{
                background: '#F7F8FC',
                padding: 0,
                height: '85px',
                position: 'fixed',
                zIndex: 1,
                top: 0,
                right: 0,
                width: '100%',
            }">
                <Header />
            </a-layout-header>
            <a-layout-content>
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-spin>
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
import { useEtcStore } from '@/store/etc';
import { useDeviceStore } from '@/store/device';
import { useSSEStore } from '@/store/sse';
import { onMounted } from 'vue';
import api from '@/api';

const etc = useEtcStore();
const deviceStore = useDeviceStore();
const sseStore = useSSEStore();

onMounted(async () => {
    // 首页初始化时，获取 device 列表、建立前后端 sse 连接，建立后端和云服务器之间 websocket 连接、建立后端和云服务器直接的 sse 连接
    etc.setLoading(true);
    await Promise.all([deviceStore.getDeviceList(), sseStore.initSSEClient(), api.websocket.initWebSocket(), api.sse.initSSE()]);
    etc.setLoading(false);
})

</script>
<style lang="scss" scoped>
.layout-wrap {
    min-height: 100vh;
    position: relative;
    background-color: #f7f8fc;
}
</style>