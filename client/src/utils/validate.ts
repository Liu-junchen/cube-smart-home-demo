const getStrLength = (str: string) => [...str].length;

/** 手机号校验格式 */
export const phoneNumberValidate = (phoneNumber: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
}

/** 密码校验格式 */
export const passwordValidata = (password: string) => {
    return getStrLength(password) >= 8;
}