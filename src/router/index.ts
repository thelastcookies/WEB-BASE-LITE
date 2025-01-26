import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/Login.vue'),
  }, {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layouts/Layout.vue'),
    children: [],
  }, {
    path: '/sample',
    name: 'Sample',
    component: () => import('@/views/samples/Sample.vue'),
  }, {
    path: '/500',
    name: 'NetworkError',
    component: () => import('@/views/exceptions/NetworkError.vue'),
  }, {
    path: '/:pathMatch(.*)',
    name: '404',
    meta: {
      title: '找不到页面',
    },
    component: () => import('@/views/exceptions/Error.vue'),
  }],
});

export default router;
