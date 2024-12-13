

import { getAssetsFile } from '@/utils/tools';
import type { IIconRoomMapping } from '@/ts/interface/ISideMenu';





/** 房间图标映射表 */
export const ICON_ROOM_MAPPING: IIconRoomMapping = {
    allDevices: {
        iconSrc: getAssetsFile('img/side-menu/here.png'),
        iconSrcActive: getAssetsFile('img/side-menu/here-active.png'),
    },
    default: {
        iconSrc: getAssetsFile('img/side-menu/default.png'),
        iconSrcActive: getAssetsFile('img/side-menu/default-active.png'),
    },
    bedroom: {
        iconSrc: getAssetsFile('img/side-menu/bedroom.png'),
        iconSrcActive: getAssetsFile('img/side-menu/bedroom-active.png'),
    },
    kitchen: {
        iconSrc: getAssetsFile('img/side-menu/kitchen.png'),
        iconSrcActive: getAssetsFile('img/side-menu/kitchen-active.png'),
    },
    bathroom: {
        iconSrc: getAssetsFile('img/side-menu/bathroom.png'),
        iconSrcActive: getAssetsFile('img/side-menu/bathroom-active.png'),
    },
    noGroup: {
        iconSrc: getAssetsFile('img/side-menu/no-group.png'),
        iconSrcActive: getAssetsFile('img/side-menu/no-group-active.png'),
    },
    study: {
        iconSrc: getAssetsFile('img/side-menu/study.png'),
        iconSrcActive: getAssetsFile('img/side-menu/study-active.png'),
    },
    toolRoom: {
        iconSrc: getAssetsFile('img/side-menu/tool-room.png'),
        iconSrcActive: getAssetsFile('img/side-menu/tool-room-active.png'),
    },
    gardenHouse: {
        iconSrc: getAssetsFile('img/side-menu/garden-house.png'),
        iconSrcActive: getAssetsFile('img/side-menu/garden-house-active.png'),
    },
    teaRoom: {
        iconSrc: getAssetsFile('img/side-menu/tea-room.png'),
        iconSrcActive: getAssetsFile('img/side-menu/tea-room-active.png'),
    },
    babyRoom: {
        iconSrc: getAssetsFile('img/side-menu/baby-room.png'),
        iconSrcActive: getAssetsFile('img/side-menu/baby-room-active.png'),
    },
};


