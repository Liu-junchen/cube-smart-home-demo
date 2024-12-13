import cameraImg from '@/assets/img/room/camera.png';
import repeaterImg from '@/assets/img/room/repeater.png';

// 设备关闭状态
import { ECapabilityComponentName, ECapabilitySettingLocation } from '@/ts/enum/ECapabilityConfig';
import EModalPage from '@/ts/enum/EModalPage';

const categoryComponentMapping = {
    /** 摄像头 */
    camera: {
        name: 'ROOM.CATEGORY.CAMERA',
        icon: cameraImg,
        state: [{ component: ECapabilityComponentName.CAMERA, priority: 1 }],
        controlPage: [EModalPage.CAMERA],
        setting: [
            {
                component: ECapabilityComponentName.CAMERA,
                priority: 1,
                location: ECapabilitySettingLocation.BASE_INFO,
            },
        ],
    },
    /** 中继器 */
    repeater: {
        name: 'ROOM.CATEGORY.REPEATER',
        icon: repeaterImg,
        state: [{ component: ECapabilityComponentName.REPEATER_WORK_STATUS, priority: 1 }],
        controlPage: [EModalPage.REPEATER],
        setting: [], // 使用能力对应的组件
    },
};

export const cameraEspSettingComponents = [
    {
        component: ECapabilityComponentName.CAMERA_ESP,
        priority: 1,
        location: ECapabilitySettingLocation.BASE_INFO,
    },
];

export default categoryComponentMapping;
