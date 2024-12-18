import { getLocalIP } from "../utils/tools";

/** 能力枚举 */
enum ECapabilityType {
    /** 开关能力 */
    TOGGLE = 'toggle',
}

/** ihost 设备的能力类型 */
interface IIHostDeviceCapability {
    capability: ECapabilityType;
    /** 多通道组件的具体能力*/
    components?: { capability: string; name: string }[];
    /** 具体功能的使用
     * write 写
     * readWrite 读和写
    */
    permission: 'write' | 'readWrite';
    /** 通道名称 */
    name: string;
}

export class IHostDevice {
    /** 第三方设备的 deviceid */
    private third_serial_number = '';
    /** 设备名称 */
    private name = '';
    /** 设备类别 */
    private display_category = '';
    /** 设备能力字段 */
    private capabilities: IIHostDeviceCapability[] = [];
    /** 设备能力状态 */
    private state: any = null;
    /** 设备标签 */
    private tags: any = null;
    /** 设备在线状态 */
    private online = true;
    /** 设备制造商 */
    private manufacturer = '';
    /** 设备产品型号 */
    private model = '';
    /** 固件版本 */
    private firmware_version = '';
    /** 设备服务地址 */
    private service_address? = '';
    constructor(deviceInfo: any) {
        const { name, deviceid, online, extra: { manufacturer, model }, params: { switches, fwVersion }, tags, localAddress } = deviceInfo;
        this.third_serial_number = deviceid;
        this.name = name;
        this.online = online;
        this.manufacturer = manufacturer;
        this.firmware_version = fwVersion;
        this.model = model;
        this.tags = tags;
        this.service_address = `http://${getLocalIP()}:3000`;

        this.capabilities = switches.map((item: any) => {
            return {
                capability: 'toggle',
                permission: 'readWrite',
                name: `${item.outlet + 1}`
            }
        })
        this.state = {
            toggle: {}
        };
        switches.forEach((item: { switch: string, outlet: number}) => {
            this.state.toggle[item.outlet + 1] = {
                toggleState: item.switch
            }
        })
    }
}