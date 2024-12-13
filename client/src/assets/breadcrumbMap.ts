const breadcrumbMap: breadcrumbMapType = {
    // 场景列表
    scene: 'SCENE.SCENE_LISTS',
    // 添加场景
    addScene: 'SCENE.ADD',
    // 编辑场景
    editScene: 'SCENE.EDIT',
    // 所有设备
    room: 'ROOM.ALL_DEVICES',
    // 添加房间
    addRoom: 'ROOM.ADD_ROOM',
    // 添加房间
    editRoom: 'ROOM.EDIT_ROOM',
    // 添加设备
    addDevice: 'ROOM.ADD_DEVICE',
    // 搜索摄像头
    searchCamera: 'ROOM.CAMERA.TO_ONVIF',
    // 智能安防
    aiSecurity: 'SECURITY.SMART_SECURITY',
    // 编辑群组
    editGroup: 'ROOM.TO_EDIT_GROUP',
    // 设备详情
    deviceDetail: 'ROOM.DEVICE_DETAIL.DEVICE_INFO',
    // 设备设置
    cameraDetail: 'ROOM.DEVICE_DETAIL.DEVICE_INFO',
    // 操作日志
    operateReport: 'ROOM.DEVICE_DETAIL.OPERATION_LOG',
    // 调试日志
    debugReport: 'ROOM.DEVICE_DETAIL.DEBUG_LOG',
    // 编辑安防模式
    editSecurityMode: 'SECURITY.EDIT',
    // 智能安防日志
    securityLog: 'SECURITY.SECURITY_LOG',
    // 场景日志
    sceneLog: 'SCENE.SCENE_LOG',
    // 场景日志
    allSceneLog: 'SCENE.SCENE_LOG',
    // AI 侦测
    aiDetection: 'DETECTION.AI_DETECTION',
    // 联动日志
    detectionLog: 'DETECTION.LOGS',
    // 添加AI侦测
    addDetection: 'DETECTION.ADD',
    // 编辑AI侦测
    editDetection: 'DETECTION.EDIT',
    // 设置
    setting: 'SETTING.SETTINGS',
    // 本地存储
    localRecording: 'SETTING.LOCAL_RECORDING',
    // 所有面板
    cast: 'CAST.ALL_CONFIG',
    // 添加面板
    addCast: 'CAST.ADD',
    // zigbee图谱
    deviceMap: 'ROOM.ZIGBEE_MAP',
    // docker
    docker: 'DOCKER.DOCKER',
    // docker volume
    volume: 'DOCKER.VOLUME',
    // 实验室
    laboratory: 'LABORATORY.LABORATORY',
    // Matter
    matter: 'Matter',
    /** turbo */
    turbo: 'LABORATORY.TURBO.TURBO_MODE',
    // 轻智能子设备
    remote: 'LABORATORY.REMOTE.NAME',
    // 蓝牙
    blueTooth: 'LABORATORY.BLUE_TOOTH',
    // WiFi
    wifi: 'LABORATORY.WIFI_CONNECT.WIFI',
};

interface breadcrumbMapType {
    [path: string]: string;
}

export default breadcrumbMap;
