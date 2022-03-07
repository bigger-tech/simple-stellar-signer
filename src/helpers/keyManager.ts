import StorageKeyNotFoundError from '../routes/connect/errors/StorageKeyNotFoundError';
import type { IStoredPair } from '../routes/connect/IStoredPair';
import { getItem, storeItem } from './storage';

export const CRYPTO_KEY_ITEM_NAME = 'cryptoKey';
export const PRIVATE_KEY_ITEM_NAME = 'privateKey';

export async function storePair(privateKey: string, cryptoKey: string): Promise<void> {
    storeItem(CRYPTO_KEY_ITEM_NAME, cryptoKey);
    storeItem(PRIVATE_KEY_ITEM_NAME, privateKey);
}

export function getStoredPair(): IStoredPair {
    try {
        const storedPrivateKey = getItem(PRIVATE_KEY_ITEM_NAME);
        const storedCryptoKey = getItem(CRYPTO_KEY_ITEM_NAME);

        return { privateKey: storedPrivateKey!, cryptoKey: storedCryptoKey! };
    } catch (e) {
        throw new StorageKeyNotFoundError();
    }
}
