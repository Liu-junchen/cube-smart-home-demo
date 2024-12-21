<template>
    <div class="header">
        <a-dropdown class="header-operation">
            <a class="ant-dropdown-link" @click.prevent>
                操作项
                <DownOutlined />
            </a>
            <template #overlay>
                <a-menu>
                    <a-menu-item @click="logout">
                        退出登录
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>
<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
import api from '@/api';
import router from '@/router'
const logout = async() => {
    await api.user.logout();
    router.push('/login');
}
</script>
<style lang="scss" scoped>
.header {
    padding-right: 32px;
    @include flex(flex-end, center);
}
</style>