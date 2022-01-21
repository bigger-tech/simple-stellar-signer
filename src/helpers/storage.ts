/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { cryptoData } from '../interfaces/interface';

export const storageData = async (key: string, cryptoKey: string) => {
    sessionStorage.setItem('cryptoKey', cryptoKey);
    sessionStorage.setItem('privateKey', key);
};

export const getStorageData = (): cryptoData => {
    const secretKey = sessionStorage.getItem('privateKey');
    const cryptoKey = sessionStorage.getItem('cryptoKey');

    return { privateKey: secretKey!, cryptoKey: cryptoKey! };
};
