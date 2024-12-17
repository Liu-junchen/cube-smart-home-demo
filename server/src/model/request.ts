/** 请求类型 */
export enum EReqMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    OPTIONS = 'OPTIONS'
}

/** 响应结构 */
export interface IResponse<T> {
    error: number;
    msg?: string;
    data?: T;
}

/** 请求域名枚举 */
export enum EHttpPath {
	SSE = '/open-api/v1/sse/bridge',
    V2_API = 'cn-apia.coolkit.cn/v2',
    DISPATCH_API = 'cn-dispa.coolkit.cn'
}

export interface IHttpConfig {
    ip: string,
    path: string,
    method: EReqMethod,
    at?: string,
    params?: any
    /** 是否为 open api v2 */
    v2Api?: boolean,
    /** 是否需要 at 去请求接口 */
    needAt?: boolean,
}
