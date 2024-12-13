/** 出现面包屑的页面 */
export const HAS_BREADCRUMB_LIST = [
    '/room/addDevice',
    '/room/addCamera',
    '/room/addCamera/searchCamera',
    '/room/addRoom',
    '/room/editRoom',
    '/room/deviceMap',
    '/scene/addOrEditScene',
    '/aiDetection/addOrEditDetection',
    '/aiDetection/detectionLog',
    '/aiSecurity/editSecurityMode',
    '/scene/sceneLog',
    '/scene/allSceneLog',
    '/aiSecurity/securityLog',
    '/setting/localRecording',
    '/cast/addOrEditCast',
    '/docker/volume',
    '/docker/selfDeveloped',
    '/docker/detail',
    '/laboratory/turbo',
    '/laboratory/remote',
    '/laboratory/blueTooth',
    '/laboratory/wifi',
];

/** 出现添加设备按钮的页面 */
export const HAS_ADD_ICON_ROUTE_LIST = ['/room'];

/** 出现添加场景按钮的页面 */
export const HAS_ADD_SCENE_ICON_ROUTE_LIST = ['/scene'];

/** 出现排序按钮的页面 */
export const HAS_SORT_ICON_ROUTE_LIST = [];

/** 出现顶部栏的页面 */
export const SHOW_HEADER_LIST = [...HAS_BREADCRUMB_LIST, ...HAS_ADD_ICON_ROUTE_LIST, ...HAS_SORT_ICON_ROUTE_LIST, ...HAS_ADD_SCENE_ICON_ROUTE_LIST];

/** 出现搜索框的页面 */
export const SHOW_SEARCH_LIST = ['/room', '/scene'];
