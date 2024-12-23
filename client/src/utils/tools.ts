/**
 * Promise 版本的 setTimeout
 * @param timeout
 * @returns
 */
export function setTimeoutPromise(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

/** 生成随机数 */
export function createNonce() {
    const chars = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    let result = '';
    for (let i = 0; i < 8; i++) {
        const num = Math.ceil(Math.random() * (chars.length - 1));
        result += chars[num];
    }
    return result;
}