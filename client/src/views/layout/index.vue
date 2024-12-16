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
import { onMounted } from 'vue';

const etc = useEtcStore();
const deviceStore = useDeviceStore();

onMounted(async() => {
    // 首页初始化时，获取thing 列表
    etc.setLoading(true);
    await deviceStore.getThingList();
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