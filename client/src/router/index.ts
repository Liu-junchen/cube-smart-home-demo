import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { useEtcStore } from '@/store/etc';
const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Index.vue'),
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

router.beforeEach((to, from) => {
    // console.log(to, 'to');
    // console.log(from, 'from');
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

    const at = etc.at;

    if (to.path !== '/login' && !at) {
        return '/login';
    }

    // /**
    //  * 校正路由与菜单栏
    //  */
    // const toPathKey = to.path.split('/')[1];
    // const sideBarKeys = etc.currentMenuKey[0];

    // if (toPathKey !== sideBarKeys) {
    //     etc.menuChange(toPathKey);
    // }

});
export default router;