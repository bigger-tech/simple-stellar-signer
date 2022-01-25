import { getEncryptedData, decryptPrivateKey } from '../../helpers/security';
import { storeData, getStoredData } from '../../helpers/storage';
import { Keypair } from 'stellar-sdk';
import InvalidPrivateKeyError from './errors/InvalidPrivateKeyError';
import StorageKeyNotFoundError from './errors/StorageKeyNotFoundError';

const CRYPTO_KEY_ITEM_NAME = 'cryptoKey';
const PRIVATE_KEY_ITEM_NAME = 'privateKey';

export async function getStellarKeypair(key: string): Promise<Keypair> {
    try {
        const sourceKeys = Keypair.fromSecret(key);
        return sourceKeys;
    } catch (e) {
        throw new InvalidPrivateKeyError();
    }
}

export async function storeKey(key: string): Promise<void> {
    const encryptedPair = await getEncryptedData(key);
    storeData(CRYPTO_KEY_ITEM_NAME, encryptedPair.cryptoKey);
    storeData(PRIVATE_KEY_ITEM_NAME, encryptedPair.privateKey);
}

export async function getStoredKey(): Promise<string> {
    try {
        const storedPrivateKey = getStoredData(PRIVATE_KEY_ITEM_NAME);
        const storedCryptoKey = getStoredData(CRYPTO_KEY_ITEM_NAME);

        const privateKey = await decryptPrivateKey(storedPrivateKey!, storedCryptoKey!);
        return privateKey;
    } catch (e) {
        throw new StorageKeyNotFoundError();
    }
}
