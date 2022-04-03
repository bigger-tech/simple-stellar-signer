import type { IStoredPair } from '../routes/connect/IStoredPair';

let arrayBuffer: Uint8Array;

function uint8ArrayFromCharCode(data: string): Uint8Array {
    const array = new Uint8Array([...data].map((char) => char.charCodeAt(0)));
    return array;
}

// ENCRYPT PART

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
    const key = await window.crypto.subtle.exportKey(
        'raw', //can be "jwk" or "raw"
        cryptoKey, //extractable must be true
    );
    const uintArray = new Uint8Array(key);
    const stringArray = String.fromCharCode.apply(null, Array.from(uintArray));

    return stringArray;
}

async function encryptData(data: string, cryptoKey: CryptoKey) {
    const dataBuffer = new TextEncoder().encode(data);
    arrayBuffer = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: arrayBuffer,
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        cryptoKey, //from generateKey or importKey above
        dataBuffer, //ArrayBuffer of data you want to encrypt
    );

    const uintArray = new Uint8Array(encryptedData);
    const stringArray = String.fromCharCode.apply(null, Array.from(uintArray));
    return stringArray;
}

export async function getEncryptedData(data: string): Promise<IStoredPair> {
    const cryptoKey = await generateKey();
    const exportedKey = await exportKey(cryptoKey);
    const encryptedData = await encryptData(data, cryptoKey);
    console.log(arrayBuffer);

    const stringArray = String.fromCharCode.apply(null, Array.from(arrayBuffer));

    return { privateKey: encryptedData, cryptoKey: exportedKey, iv: stringArray };
}

// DECRYPT PART

async function importKey(exportedCryptoKey: string) {
    const arrayFromCharCode = uint8ArrayFromCharCode(exportedCryptoKey);
    const importedKey = window.crypto.subtle.importKey(
        'raw',
        arrayFromCharCode,
        {
            name: 'AES-GCM',
        },
        true,
        ['encrypt', 'decrypt'],
    );

    return importedKey;
}

async function decrypt(encryptedData: string, importedKey: CryptoKey, iv: string) {
    console.log(iv);

    const arrayFromCharCode = uint8ArrayFromCharCode(encryptedData);
    const ivFromCharCode = uint8ArrayFromCharCode(iv);

    console.log(ivFromCharCode);

    const decryptData = await window.crypto.subtle
        .decrypt(
            {
                name: 'AES-GCM',
                iv: ivFromCharCode.buffer, //The initialization vector you used to encrypt
                tagLength: 128, //The tagLength you used to encrypt (if any)
            },
            importedKey, //from generateKey or importKey above
            arrayFromCharCode, //ArrayBuffer of the data
        )
        .catch((e) => {
            console.error(e);
        });
    console.log({ arrayFromCharCode, ivFromCharCode, importedKey, decryptData });

    const decodedData = new TextDecoder().decode(decryptData);

    return decodedData;
}

export async function getDecryptedData(encryptedData: string, exportedCryptoKey: string, iv: string) {
    const importedKey = await importKey(exportedCryptoKey);
    const decryptedData = await decrypt(encryptedData, importedKey, iv);

    return decryptedData;
}
