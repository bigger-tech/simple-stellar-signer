import type { IStoredKeys } from '../routes/connect/IStoredKeys';
import StorageKeyNotFoundError from '../routes/connect/errors/StorageKeyNotFoundError';

export function storageData(key: string, cryptoKey: string): void {
    sessionStorage.setItem('cryptoKey', cryptoKey);
    sessionStorage.setItem('privateKey', key);
}

export function getStorageData(): IStoredKeys {
    const secretKey = sessionStorage.getItem('privateKey');
    const cryptoKey = sessionStorage.getItem('cryptoKey');

    if (secretKey && cryptoKey) {
        return { privateKey: secretKey, cryptoKey: cryptoKey };
    } else {
        throw new StorageKeyNotFoundError();
    }
}
