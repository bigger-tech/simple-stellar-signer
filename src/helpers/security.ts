import type { IStoredPair } from '../routes/connect/IStoredPair';

function uint8ArrayFromCharCode(data: string): Uint8Array {
    const array = new Uint8Array([...data].map((char) => char.charCodeAt(0)));
    return array;
}

const keyPair = window.crypto.subtle.generateKey(
    {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt'],
);

async function exportCryptoKey(): Promise<string> {
    const privateKey = (await keyPair).privateKey;

    const cryptoKey = await window.crypto.subtle.exportKey('pkcs8', privateKey!);
    const cryptoKeyToUint8Array = new Uint8Array(cryptoKey);
    const cryptoKeyString = String.fromCharCode.apply(null, Array.from(cryptoKeyToUint8Array));

    return cryptoKeyString;
}

async function encryptPrivateKey(key: string): Promise<string> {
    const publicKey = (await keyPair).publicKey;
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

    const uintArray = new Uint8Array(await encryptKey(publicKey!));
    const stringArray = String.fromCharCode.apply(null, Array.from(uintArray));

    return stringArray;
}

async function importCrypoKey(key: string): Promise<CryptoKey> {
    const arrayFromCharCode = uint8ArrayFromCharCode(key);

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
}

export async function getEncryptedData(key: string): Promise<IStoredPair> {
    const encryptedKey = await encryptPrivateKey(key);
    const encryptedCryptoKey = await exportCryptoKey();

    return { privateKey: encryptedKey, cryptoKey: encryptedCryptoKey };
}

export async function decryptPrivateKey(key: string, cryptoKey: string): Promise<string> {
    const arrayFromCharCode = uint8ArrayFromCharCode(key);

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
}
