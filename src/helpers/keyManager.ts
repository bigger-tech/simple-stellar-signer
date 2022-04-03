import StorageKeyNotFoundError from '../routes/connect/errors/StorageKeyNotFoundError';
import type { IStoredPair } from '../routes/connect/IStoredPair';
import { getItem, storeItem } from './storage';

export const CRYPTO_KEY_ITEM_NAME = 'cryptoKey';
export const PRIVATE_KEY_ITEM_NAME = 'privateKey';
export const IV_ITEM_NAME = 'iv';

export async function storePair(privateKey: string, cryptoKey: string, iv: string): Promise<void> {
    storeItem(CRYPTO_KEY_ITEM_NAME, cryptoKey);
    storeItem(PRIVATE_KEY_ITEM_NAME, privateKey);
    storeItem(IV_ITEM_NAME, iv);
}

export function getStoredPair(): IStoredPair {
    try {
        const storedPrivateKey = getItem(PRIVATE_KEY_ITEM_NAME);
        const storedCryptoKey = getItem(CRYPTO_KEY_ITEM_NAME);
        const storedIv = getItem(IV_ITEM_NAME);

        return { privateKey: storedPrivateKey!, cryptoKey: storedCryptoKey!, iv: storedIv! };
    } catch (e) {
        throw new StorageKeyNotFoundError();
    }
}
