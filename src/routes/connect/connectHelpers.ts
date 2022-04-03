import { getEncryptedData, getDecryptedData } from '../../helpers/security';
import { storePair, getStoredPair } from '../../helpers/keyManager';
import StorageKeyNotFoundError from './errors/StorageKeyNotFoundError';

export async function encryptPrivateKey(key: string): Promise<void> {
    const encryptedData = await getEncryptedData(key);
    storePair(encryptedData.privateKey, encryptedData.cryptoKey, encryptedData.iv);
}

export async function decryptPrivateKey(): Promise<string> {
    try {
        const storedPair = getStoredPair();
        const privateKey = await getDecryptedData(storedPair.privateKey, storedPair.cryptoKey, storedPair.iv);
        return privateKey;
    } catch (e) {
        throw new StorageKeyNotFoundError();
    }
}
