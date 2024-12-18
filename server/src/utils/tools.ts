import fs from 'fs';
import path from 'path';
import os from 'os';

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

export const storeJson = (module: string, key: string, value?: string) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    savedData[module][key] = value;
    jsonData = JSON.stringify(savedData);
    fs.writeFileSync(sqlPath, jsonData);
}

export const getJson = (module: string, key: string) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    return savedData[module][key];
}

export const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    let ipAddress;
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (const alias of iface!) {
            if (alias.family === 'IPv4' && alias.address!== '127.0.0.1' &&!alias.internal) {
                ipAddress = alias.address;
                break;
            }
        }
    }
    return ipAddress;
}