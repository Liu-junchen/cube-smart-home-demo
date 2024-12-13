import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/layout/index.vue'),
        redirect: '/device',
        children: [
            {
                path: '/device',
                name: 'device',
                component: () => import('@/views/device/index.vue'),
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from) => {
    
});
export default router;