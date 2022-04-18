import type IDecryptableValue from './IDecryptableValue';

let INITIALIZATION_VECTORS: Uint8Array;

export async function decryptValue(decryptableValue: IDecryptableValue): Promise<string> {
    const importedCryptoKey = await importCryptoKey(decryptableValue.cryptoKey);
    const value = uint8ArrayFromCharCode(decryptableValue.value);
    const iv = uint8ArrayFromCharCode(decryptableValue.initializationVectors);

    const decryptedValue = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv,
            tagLength: 128,
        },
        importedCryptoKey,
        value,
    );

    return new TextDecoder().decode(decryptedValue);
}

export async function encryptValue(value: string): Promise<IDecryptableValue> {
    const cryptoKey = await generateKey();
    const encodedValue = new TextEncoder().encode(value);
    INITIALIZATION_VECTORS = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptValue = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: INITIALIZATION_VECTORS,
            tagLength: 128,
        },
        cryptoKey,
        encodedValue,
    );

    const encryptedVectors = getCharCode(INITIALIZATION_VECTORS);
    const exportedCryptoKey = await exportCryptoKey(cryptoKey);
    const encryptedValue = getCharCode(encryptValue);
    return { value: encryptedValue, cryptoKey: exportedCryptoKey, initializationVectors: encryptedVectors };
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

async function exportCryptoKey(cryptoKey: CryptoKey): Promise<string> {
    const exportedCryptoKey = await window.crypto.subtle.exportKey('raw', cryptoKey);
    const exportedCryptoKeyCharCode = getCharCode(exportedCryptoKey);
    return exportedCryptoKeyCharCode;
}

async function importCryptoKey(exportedCryptoKey: string): Promise<CryptoKey> {
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

function getCharCode(buffer: ArrayBuffer | Uint8Array) {
    if (buffer instanceof ArrayBuffer) {
        const uintArray = new Uint8Array(buffer);
        return String.fromCharCode.apply(null, Array.from(uintArray));
    } else {
        return String.fromCharCode.apply(null, Array.from(buffer));
    }
}

function uint8ArrayFromCharCode(data: string): Uint8Array {
    return new Uint8Array([...data].map((char) => char.charCodeAt(0)));
}
