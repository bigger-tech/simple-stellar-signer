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

export function toFindDuplicates(arry: string[]): string[] {
    return arry.filter((item, index) => arry.indexOf(item) !== index);
}

export function getParamsFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const walletParam = urlParams.getAll('wallets');

    if (walletParam) {
        return walletParam;
    } else {
        return undefined;
    }
}
