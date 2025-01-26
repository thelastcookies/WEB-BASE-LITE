import { createApp } from 'vue';
import App from './App.vue';

export const app = createApp(App);

// 全局样式表
import '@/assets/style/index.less';

// Pinia
import { createPinia } from 'pinia';
app.use(createPinia());

// router
import router from '@/router';
// 导入路由守卫
import '@/router/guards.ts';
app.use(router);

// UI框架 ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd);

// UnoCSS
import 'virtual:uno.css';

app.mount('#app');
