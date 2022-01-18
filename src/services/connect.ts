import { StellarSDK } from '../api/stellarSdk';

const encryptKey = (key: string, salt: number) => {
    const encodedData = btoa(key);
    const saltValue = Math.floor(Math.random() * 10000000 * salt);
    return encodedData + saltValue;
};

const saveSecretKeyInSessionStorage = (key: string) => {
    const encodedKey = encryptKey(key, 1000);
    sessionStorage.setItem('key', encodedKey);
};

const connectWithSecretKey = (key: string) => {
    const sourceKeys = StellarSDK.Keypair.fromSecret(key);
    saveSecretKeyInSessionStorage(key);
    return sourceKeys;
};

const getPublicKey = (key: string): string => {
    const sourceKeys = connectWithSecretKey(key);
    const publicKey = sourceKeys.publicKey();
    return publicKey;
};

export const changeTitle = () => {
    const input = <HTMLInputElement>document.querySelector('#secret-key-input');
    const title = <HTMLInputElement>document.querySelector('#public-key-title');

    const publicKey = getPublicKey(input.value);
    input.value = '';
    title.innerText = `Public Key: ${publicKey}`;
};
