/** 请求类型 */
export enum EReqMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    OPTIONS = 'OPTIONS'
}

/** 响应结构 */
export type IResponse<T> = {
    error: number;
    msg?: string;
    data?: T;
    message?: string;
    IP?: string;
    domain?: string;
    port?: number;
};

/** 请求域名枚举 */
export enum EHttpPath {
	SSE = '/open-api/v1/sse/bridge',
    V2_API = 'cn-apia.coolkit.cn/v2',
    DISPATCH_API = 'cn-dispa.coolkit.cn',
    OPEN_API = '/open-api/v2/rest'
}

export interface IHttpConfig {
    ip: string,
    path: string,
    method: EReqMethod,
    params?: any
    /** 域名 */
    domain: EHttpPath,
    /** 是否需要 at 去请求接口 */
    needAt?: boolean,
    /** 是否需要 token 去请求 iHost 接口 */
    needToken?: boolean,
    https?: boolean,
}
