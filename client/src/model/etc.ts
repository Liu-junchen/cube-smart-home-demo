export interface IEtcState {
    loading: boolean;
    userStatus: EUserStatus;
}

export enum EUserStatus {
    /** 未登录 */
    NOTLOGGED,
    /** 已登录 */
    LOGGED,
}