import fs from 'fs';
import path from 'path';

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

export const storeAt = (at: string) => {
    const dataToSave = {
        at
    };
    const jsonData = JSON.stringify(dataToSave, null, 2);
    const filePath = path.join(__dirname, '../store/user.json');
    fs.writeFileSync(filePath, jsonData);
}