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
    domain?: string;
    port?: number;
}
