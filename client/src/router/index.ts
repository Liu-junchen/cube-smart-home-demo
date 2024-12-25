import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { useEtcStore } from '@/store/etc';
import { EUserStatus } from '@/types/etc';
const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue'),
    },
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/Layout/index.vue'),
        redirect: '/device',
        children: [
            {
                path: '/device',
                name: 'device',
                component: () => import('@/views/Device/index.vue'),
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async(to, from) => {
    const etc = useEtcStore();

    /**
     *  跳转页面时回到顶部
     * */

    // chrome
    document.body.scrollTop = 0;
    // firefox
    document.documentElement.scrollTop = 0;
    // safari
    window.pageYOffset = 0;

    // 每次切换路由时，都去获取用户登录状态
    await etc.getUserStatus();

    const userStatus = etc.userStatus;

    if (to.path !== '/login' && userStatus !== EUserStatus.LOGGED) {
        return '/login';
    }

});
export default router;