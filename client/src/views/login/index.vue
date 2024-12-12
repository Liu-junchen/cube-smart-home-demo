<template>
    <div>登录页面{{ count }}</div>
    <button @click="() => count ++"></button>
</template>
<script setup>
import { ref } from 'vue';
let count = ref(0);
</script>