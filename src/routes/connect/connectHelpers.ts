import { Keypair } from 'stellar-sdk';
import { publicKey } from '../../stores/store';
import { connectionError } from './connectStores';
import { getEncryptedData } from '../../helpers/security';
import { storageData } from '../../helpers/storage';
import InvalidPrivateKeyError from './errors/InvalidPrivateKeyError';

export async function setPrivateKey(key: string) {
    try {
        const sourceKeys = Keypair.fromSecret(key);
        const encryptedData = await getEncryptedData(key);
        storageData(encryptedData.privateKey, encryptedData.cryptoKey);
        publicKey.set(sourceKeys.publicKey());
    } catch (e) {
        publicKey.set('');
        connectionError.set('Invalid key, please try again');
        throw new InvalidPrivateKeyError();
    }
}
