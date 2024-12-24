export interface IEtcState {
    loading: boolean;
    userStatus: EUserStatus;
}

export enum EUserStatus {
    /** 未登录 */
    NOT_LOGED,
    /** 已登录 */
    LOGGED,
}