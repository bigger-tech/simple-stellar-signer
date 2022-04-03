import type { IStoredPair } from '../routes/connect/IStoredPair';
let INITIALIZATION_VECTORS: Uint8Array;

function uint8ArrayFromCharCode(data: string): Uint8Array {
    const array = new Uint8Array([...data].map((char) => char.charCodeAt(0)));
    return array;
}

function getCharCode(buffer: ArrayBuffer | Uint8Array) {
    if (buffer instanceof ArrayBuffer) {
        const uintArray = new Uint8Array(buffer);
        return String.fromCharCode.apply(null, Array.from(uintArray));
    } else {
        return String.fromCharCode.apply(null, Array.from(buffer));
    }
}

async function generateKey() {
    const cryptoKey = await window.crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        },
        true,
        ['encrypt', 'decrypt'],
    );

    return cryptoKey;
}

async function exportKey(cryptoKey: CryptoKey) {
    const exportedCryptoKey = await window.crypto.subtle.exportKey('raw', cryptoKey);
    const exportedCryptoKeyCharCode = getCharCode(exportedCryptoKey);

    return exportedCryptoKeyCharCode;
}

async function encryptData(data: string, cryptoKey: CryptoKey) {
    const encodedData = new TextEncoder().encode(data);
    INITIALIZATION_VECTORS = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: INITIALIZATION_VECTORS,
            tagLength: 128,
        },
        cryptoKey,
        encodedData,
    );

    const encryptedDataCharCode = getCharCode(encryptedData);
    return encryptedDataCharCode;
}

export async function getEncryptedData(data: string): Promise<IStoredPair> {
    const cryptoKey = await generateKey();
    const exportedKey = await exportKey(cryptoKey);
    const encryptedData = await encryptData(data, cryptoKey);
    const vectorCharCode = getCharCode(INITIALIZATION_VECTORS);

    return { privateKey: encryptedData, cryptoKey: exportedKey, iv: vectorCharCode };
}

async function importKey(exportedCryptoKey: string) {
    const cryptoKey = uint8ArrayFromCharCode(exportedCryptoKey);
    const importedKey = window.crypto.subtle.importKey(
        'raw',
        cryptoKey,
        {
            name: 'AES-GCM',
        },
        true,
        ['encrypt', 'decrypt'],
    );

    return importedKey;
}

async function decrypt(encryptedData: string, importedKey: CryptoKey, iv: string) {
    const data = uint8ArrayFromCharCode(encryptedData);
    const vector = uint8ArrayFromCharCode(iv);

    const decryptedData = await window.crypto.subtle
        .decrypt(
            {
                name: 'AES-GCM',
                iv: vector,
                tagLength: 128,
            },
            importedKey,
            data,
        )
        .catch((e) => {
            console.error(e);
        });

    const decodedData = new TextDecoder().decode(decryptedData);

    return decodedData;
}

export async function getDecryptedData(encryptedData: string, exportedCryptoKey: string, iv: string) {
    const importedKey = await importKey(exportedCryptoKey);
    const decryptedData = await decrypt(encryptedData, importedKey, iv);

    return decryptedData;
}
