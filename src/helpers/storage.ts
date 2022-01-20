import { encryptPrivateKey, exportCryptoKey } from './security';

const saveSecretKey = async (key: string) => {
    const encodedKey = await encryptPrivateKey(key);
    sessionStorage.setItem('key', encodedKey);
};

const saveCryptoKey = async () => {
    const cryptoKey = await exportCryptoKey();
    const cryptoKeyToUint8Array = new Uint8Array(cryptoKey);
    const arrayString = String.fromCharCode.apply(null, Array.from(cryptoKeyToUint8Array)); // Apply needs a number[] as arg, passing a Uint8Array works but will pop a type error
    sessionStorage.setItem('cryptoKey', arrayString);
};

export const savePrivateDataInSessionStorage = async (key: string) => {
    await saveCryptoKey();
    await saveSecretKey(key);
};
