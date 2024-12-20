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
    permission: string;
    /** 通道名称 */
    name: string;
}

export class IHostDevice {
    // third_serial_number，name，display_category，capabilities，state，manufacturer，model，firmware_version，service_address，tags
    /** 第三方设备的 deviceid */
    public third_serial_number = '';
    /** 设备名称 */
    public name = '';
    /** 设备类别 */
    public display_category = 'switch';
    /** 设备能力字段 */
    public capabilities: IIHostDeviceCapability[] = [];
    /** 设备能力状态 */
    public state: any = null;
    /** 设备标签 */
    public tags: any = null;
    /** 设备制造商 */
    public manufacturer = '';
    /** 设备产品型号 */
    public model = '';
    /** 固件版本 */
    public firmware_version = '';
    /** 设备服务地址 */
    public service_address? = '';

    constructor(deviceInfo: any) {
        const { name, deviceid, extra: { manufacturer, model }, params: { switches, fwVersion } } = deviceInfo;
        this.third_serial_number = deviceid;
        this.name = name;
        this.manufacturer = manufacturer;
        this.firmware_version = fwVersion;
        this.model = model;
        this.tags = { deviceid };
        this.service_address = `http://${getLocalIP()}:3000/device/${deviceid}`;

        this.capabilities = switches.map((item: any) => {
            return {
                capability: 'toggle',
                permission: '1110',
                name: `${item.outlet + 1}`
            }
        });
        this.state = {
            toggle: {}
        };
        switches.forEach((item: { switch: string, outlet: number }) => {
            this.state.toggle[item.outlet + 1] = {
                toggleState: item.switch
            }
        })
    }
}