import { getEncryptedData, decryptPrivateKey } from '../../helpers/security';
import { storePair, getStoredPair } from '../../helpers/keyManager';
import StorageKeyNotFoundError from './errors/StorageKeyNotFoundError';

export async function encryptPrivateKey(key: string): Promise<void> {
    const encryptedData = await getEncryptedData(key);
    storePair(encryptedData.privateKey, encryptedData.cryptoKey);
}

export async function decryptPrivatePair(): Promise<string> {
    try {
        const storedPair = getStoredPair();
        const privateKey = await decryptPrivateKey(storedPair.privateKey, storedPair.cryptoKey);
        return privateKey;
    } catch (e) {
        throw new StorageKeyNotFoundError();
    }
}

export function removeDuplicates(array: string[]): string[] {
    const newArray = [...new Set(array)];
    if (newArray.length === array.length) {
        return array;
    } else {
        console.warn(`One or more wallets were deleted for duplicate (Given array: ${array} - New array: ${newArray})`);
        return newArray;
    }
}

export function getWalletsFromUrl(): string[] {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.getAll('wallets');
}
