import { getEncryptedData, getDecryptedData } from '../../helpers/security';
import { storePair, getStoredPair } from '../../helpers/keyManager';
import DataEncryptionError from './errors/DataEncryptionError';
import DataDecryptionError from './errors/DataDecryptionError';

export async function encryptPrivateKey(key: string): Promise<void> {
    try {
        const encryptedData = await getEncryptedData(key);
        storePair(encryptedData.privateKey, encryptedData.cryptoKey, encryptedData.iv);
    } catch (e) {
        throw new DataEncryptionError();
    }
}

export async function decryptPrivateKey(): Promise<string> {
    try {
        const storedPair = getStoredPair();
        return getDecryptedData(storedPair.privateKey, storedPair.cryptoKey, storedPair.iv);
    } catch (e) {
        throw new DataDecryptionError();
    }
}
