/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StellarSDK } from '../api/stellarSdk';
import { publicKey } from '../stores/store';
import { decryptPrivateKey, getEncryptedData } from './security';
import { storageData, getStorageData } from './storage';

export const connectWithSecretKey = async (key: string) => {
    try {
        const sourceKeys = StellarSDK.Keypair.fromSecret(key);
        const encryptedData = await getEncryptedData(key);
        storageData(encryptedData.privateKey, encryptedData.cryptoKey);
        publicKey.set(sourceKeys.publicKey());
    } catch (e) {
        console.error(e);
        publicKey.set('Invalid key, try again');
        return e;
    }
};

export const connectWithStorageData = async () => {
    try {
        const data = getStorageData();
        const decryptedKey = await decryptPrivateKey(data.privateKey, data.cryptoKey);
        await connectWithSecretKey(decryptedKey);
    } catch (e) {
        console.log('Private key was not found in Storage');
        return e;
    }
};
