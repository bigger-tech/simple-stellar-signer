import { StellarSDK } from '../api/stellarSdk';
import type { Keypair } from 'stellar-sdk';
import { decryptPrivateKey } from './security';
import { savePrivateDataInSessionStorage } from './storage';
import { publicKey } from '../stores/store';

const connectWithSecretKey = (key: string): Keypair => {
    const sourceKeys = StellarSDK.Keypair.fromSecret(key);
    return sourceKeys;
};

export const initConnect = async () => {
    const input = <HTMLInputElement>document.querySelector('#secret-key-input');

    try {
        const userKeys = connectWithSecretKey(input.value);
        savePrivateDataInSessionStorage(input.value);
        publicKey.set(userKeys.publicKey());
    } catch (e) {
        publicKey.set('There was a problem, try again');
        console.error(e);
        return e;
    }
};

export const decryptPk = async () => {
    try {
        const string = window.sessionStorage.getItem('key');

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await decryptPrivateKey(string!);
    } catch (e) {
        console.error(`There was a problem decrypting the key: ${e}`);
        return e;
    }
};
