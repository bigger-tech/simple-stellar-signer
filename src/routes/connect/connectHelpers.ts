import { getEncryptedData, decryptPrivateKey } from '../../helpers/security';
import { Keypair } from 'stellar-sdk';
import InvalidPrivateKeyError from './errors/InvalidPrivateKeyError';
import { storePair, getStoredPair } from '../../helpers/keyManager';

export async function getStellarKeypair(key: string): Promise<Keypair> {
    try {
        const sourceKeys = Keypair.fromSecret(key);
        return sourceKeys;
    } catch (e) {
        throw new InvalidPrivateKeyError();
    }
}

export async function encryptPrivateKey(key: string): Promise<void> {
    const encryptedData = await getEncryptedData(key);
    storePair(encryptedData.privateKey, encryptedData.cryptoKey);
}

export async function decryptPrivatePair(): Promise<string> {
    const storedPair = getStoredPair();
    const privateKey = await decryptPrivateKey(storedPair.privateKey, storedPair.cryptoKey);
    return privateKey;
}
