import type { IStoredKeys } from '../routes/connect/IStoredKeys';

const uintEightArrayFromCharCode = (data: string): Uint8Array => {
    const array = new Uint8Array([...data].map((char) => char.charCodeAt(0)));
    return array;
};

const keyPair = await window.crypto.subtle.generateKey(
    {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt'],
);

const exportCryptoKey = async (): Promise<string> => {
    const cryptoKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey!);
    const cryptoKeyToUint8Array = new Uint8Array(cryptoKey);
    const cryptoKeyString = String.fromCharCode.apply(null, Array.from(cryptoKeyToUint8Array));

    return cryptoKeyString;
};

const encryptPrivateKey = async (key: string): Promise<string> => {
    const encodeKey = new TextEncoder().encode(key);

    const encryptKey = async (publicKey: CryptoKey) => {
        return await window.crypto.subtle.encrypt(
            {
                name: 'RSA-OAEP',
            },
            publicKey,
            encodeKey,
        );
    };

    const uintArray = new Uint8Array(await encryptKey(keyPair.publicKey!));
    const stringArray = String.fromCharCode.apply(null, Array.from(uintArray));

    return stringArray;
};

const importCrypoKey = async (key: string): Promise<CryptoKey> => {
    const arrayFromCharCode = uintEightArrayFromCharCode(key);

    const importedKey = await window.crypto.subtle.importKey(
        'pkcs8',
        arrayFromCharCode,
        {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-256' },
        },
        false,
        ['decrypt'],
    );

    return importedKey;
};

export const getEncryptedData = async (key: string): Promise<IStoredKeys> => {
    const encryptedKey = await encryptPrivateKey(key);
    const encryptedCryptoKey = await exportCryptoKey();

    return { privateKey: encryptedKey, cryptoKey: encryptedCryptoKey };
};

export const decryptPrivateKey = async (key: string, cryptoKey: string): Promise<string> => {
    const arrayFromCharCode = uintEightArrayFromCharCode(key);

    const privateKey = await importCrypoKey(cryptoKey);

    const decryptedKey = await window.crypto.subtle.decrypt(
        {
            name: 'RSA-OAEP',
        },
        privateKey!,
        arrayFromCharCode,
    );

    const decoderData = new TextDecoder().decode(decryptedKey);
    return decoderData;
};
