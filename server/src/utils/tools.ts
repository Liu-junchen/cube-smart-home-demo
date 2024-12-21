import fs from 'fs';
import path from 'path';
import os from 'os';

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

/** 存储后端键值数据到 json 文件 */
export const storeKeyValue = (module: string, key: string, value?: any) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    if(!savedData[module]) {
        savedData[module] = {};
    }
    savedData[module][key] = value;
    jsonData = JSON.stringify(savedData);
    fs.writeFileSync(sqlPath, jsonData);
}


/** 存储后端键值数据到 json 文件 */
export const storeModuleValue = (module: string, value?: any) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    savedData[module] = value;
    jsonData = JSON.stringify(savedData);
    fs.writeFileSync(sqlPath, jsonData);
}


/** 从 json 文件中获取具体模块和具体键值的数据 */
export const getKeyValue = (module: string, key: string) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    return savedData[module]?.[key];
}

/** 从 json 文件中获取具体模块的数据 */
export const getModuleValue = (module: string) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    return savedData[module];
}

/** 从 json 文件中删除具体 key 的数据 */
export const deleteKeyValue = (module: string, key: string) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    delete savedData[module]?.[key];
    jsonData = JSON.stringify(savedData);
    fs.writeFileSync(sqlPath, jsonData);
}

/** 从 json 文件中删除整个 module 的数据 */
export const deleteModuleValue = (module: string) => {
    const sqlPath = path.join(__dirname, '../../../sql.json');
    let jsonData = fs.readFileSync(sqlPath, 'utf8');
    const savedData = JSON.parse(jsonData);
    delete savedData?.[module];
    jsonData = JSON.stringify(savedData);
    fs.writeFileSync(sqlPath, jsonData);
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