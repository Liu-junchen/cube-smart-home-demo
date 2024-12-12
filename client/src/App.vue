<script setup lang="ts">
import { onMounted } from 'vue';
import { useEtcStore } from '@/store/etc';
const etc = useEtcStore();
onMounted(() => {
  etc.getUserStatus()
})
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
