import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: import('@/views/login/index.vue'),
    },
    {
        path: '/device',
        name: 'device',
        component: import('@/views/device/index.vue'),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const etc = useEtcStore();
    const dockerStore = useDockerStore();

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

    /**
     * 校正路由与菜单栏
     */
    const toPathKey = to.path.split('/')[1] as EMenuKeys;
    const sideBarKeys = etc.currentMenuKey[0];

    if (toPathKey !== sideBarKeys) {
        etc.menuChange(toPathKey);
    }

    // 配对结束且不在配对页面时，清除已找到的zigbee设备
    const pairingStore = usePairingStore();
    if (pairingStore.countdownTime === pairingStore.timeGap && to.path !== '/room/addDevice') {
        pairingStore.clearPairingDeviceList();
    }

    // 配对摄像头过程中，退出添加摄像头页面时，停止配对摄像头
    const cameraStore = usePairingCameraStore();
    if (cameraStore.countdownTime !== cameraStore.timeGap && from.path === '/room/addCamera/searchCamera') {
        // console.log('停止配对摄像头--------------');

        cameraStore.stopPairing();
    }

    // 切换页面取消模式
    const familyStore = useFamilyStore();
    if (!['/room'].includes(to.path)) {
        // 清空选中卡片状态
        familyStore.changeActCardInfo('zigbee', '--');
        familyStore.changeActCardInfo('group', -1);

        // 切换页面时关闭摄像头播放
        const cameraEspStore = useCameraEspStore();
        const cameraStore = useCameraStore();

        if (cameraEspStore.pipVisible) {
            // console.log("我去关闭esp摄像头了");
            cameraEspStore.setPipVisible(false);
            cameraEspStore.closeImg();
        }
        if (cameraStore.pipVisible) {
            cameraStore.setPipVisible(false);
            cameraStore.closeCameraStream();
        }
    }

    // 进入Matter网桥子目录选中Matter网桥菜单
    if (['/matter/pairing', '/matter/support'].includes(to.path)) {
        const pairingMatterStore = usePairingMatterStore();
        if (['/matter/pairing'].includes(to.path) && pairingMatterStore.matterIsPairing) {
            etc.setMatterStep(2);
        }
        if (['/matter/support'].includes(to.path)) {
            etc.setMatterStep(0);
        }
        etc.subMenuChange('Matter');
    } else {
        etc.setMatterStep(0);
    }

    // 离开docker所有页面时清除全局的轮询定时器;
    if (from.path.includes('/docker')) {
        etc.setDockerPollingLock(true);
        etc.clearDockerInterval(etc.dockerTimer);
    }

    // 进入docker首页、容器页面、volume页面，如果TF卡状态是就绪状态开启轮询;(docker首页会再查一遍TF卡状态);
    if (to.path.includes('/docker')) {
        etc.setDockerPollingLock(true);
        etc.clearDockerInterval(etc.dockerTimer);
        setTimer(dockerStore.tfInfoList?.state as number);
    }
});
export default router;