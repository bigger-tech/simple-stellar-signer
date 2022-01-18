import { StellarSDK } from '../api/stellarSdk';
import type { Keypair } from 'stellar-sdk';

const encryptKey = (key: string, salt: number) => {
    const encodedData = btoa(key);
    const saltValue = Math.floor(Math.random() * 10000000 * salt);
    return encodedData + saltValue;
};

const saveSecretKeyInSessionStorage = (key: string) => {
    const encodedKey = encryptKey(key, 1000);
    sessionStorage.setItem('key', encodedKey);
};

const connectWithSecretKey = (key: string): Keypair | void => {
    try {
        const sourceKeys = StellarSDK.Keypair.fromSecret(key);
        saveSecretKeyInSessionStorage(key);
        return sourceKeys;
    } catch (e) {
        return console.error('Invalid key: ', e);
    }
};

const getPublicKey = (key: string): string | void => {
    try {
        const sourceKeys = connectWithSecretKey(key);

        if (sourceKeys) {
            const publicKey = sourceKeys.publicKey();
            return publicKey;
        }
    } catch (e) {
        return console.log('Error while getting the public key', e);
    }
};

export const changeTitle = () => {
    const input = <HTMLInputElement>document.querySelector('#secret-key-input');
    const title = <HTMLInputElement>document.querySelector('#public-key-title');

    const publicKey = getPublicKey(input.value);
    input.value = '';
    title.innerText = `Public Key: ${publicKey}`;
};
