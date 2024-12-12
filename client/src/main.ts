import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store';

import router from './router';
import Antd from 'ant-design-vue';
import { message } from 'ant-design-vue';

import '@/assets/style/index.scss';
import 'ant-design-vue/dist/antd.css';
import 'gridstack/dist/gridstack.css';
import 'gridstack/dist/gridstack-extra.css';
import 'ant-design-vue/es/message/style/css';

message.config({
    maxCount: 1,
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Antd);
app.mount('#app');
