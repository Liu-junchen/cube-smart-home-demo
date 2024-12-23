export interface IDevice {
    /** 设备 名称 */
    name: string;
    /** 设备ID  */
    deviceid: string;
    /** 设备所属用户 apikey */
    apikey: string;
    /** 数据库中 factoryDevice 的 extra 字段中的内容*/
    extra: IDeviceExtra;
    /** 品牌名称 */
    brandName: string;
    /** 品牌 logo */
    brandLogo: string;
    /** 是否展示品牌 */
    showBrand: boolean;
    /** 产品型号名称 */
    productModel: string;
    /** 设备所属群组信息列表 */
    devGroups?: object[];
    /** 标签信息对象，里面存储的自定义 key - value 字符串 */
    tags?: object;
    /** 设备端配置信息，来源于 factorydevices 表的 deviceConfig */
    devConfig?: object;
    /** 用户设置 */
    settings?: object;
    /** 设备的家庭设置 */
    family: object;
    /** 如果是别的用户分享过来的设备，包含源用户信息 */
    sharedBy: object | null;
    /** 如果是分享给别的用户的设备，包含目标用户信息 */
    shareTo: Array<object> | null;
    /** 设备 apikey，用于鉴权和加密 */
    devicekey: string;
    /** 在线状态 */
    online: boolean;
    /** 设备的状态属性 */
    params?: IDeviceParams;
    /** GSM 设备的卡状态对象 */
    gsmInfoData: object | null;
    /** 设备是否已经同步到 iHost */
    synced: boolean;
}

interface IDeviceExtra {
    model: string;
    ui: string;
    uiid: number;
    description: string;
    manufacturer: string;
    mac: string;
    apmac: string;
    modelInfo: string;
    brandId: string;
}

export enum ESwitchStatus {
    ON = 'on',
    OFF = 'off',
}

/** 设备状态对象 */
export interface IDeviceParams {
    /** 多通道开关状态 */
    switches?: ISwitchConfig[];
    /** 单通道开关状态 */
    switch?: ESwitchStatus;
    /** 通电反应 */
    configure?: object[];
    /** 定时器设置 */
    timers?: Array<object>;
    /** 网络指示灯 */
    sledOnline?: ESwitchStatus;
    /** 点动设置  */
    pulses?: Array<object>;
    /** 固件版本 */
    fwVersion?: string;
    /** 设备芯片 id */
    chipid?: string;
    /** 信号强度 */
    rssi?: string;
    /** 设备在线情况 */
    online?: boolean;
}

export interface ISwitchConfig {
    switch: ESwitchStatus;
    outlet: number;
}


export interface IDeviceData {
    deviceList: IDevice[];
}

export interface IDeviceState {
    deviceList: IDevice[];
}