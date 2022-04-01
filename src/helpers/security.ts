import type { IStoredPair } from '../routes/connect/IStoredPair';
const encoder = new TextEncoder();

function uint8ArrayFromCharCode(data: string): Uint8Array {
    const array = new Uint8Array([...data].map((char) => char.charCodeAt(0)));
    return array;
}

let keyPair: CryptoKey;

window.crypto.subtle
    .generateKey(
        {
            name: 'AES-GCM',
            length: 256, //can be  128, 192, or 256
        },
        true,
        ['encrypt', 'decrypt'],
    )
    .then((key) => {
        keyPair = key;
    })
    .catch((e) => {
        throw new Error(`${e}`);
    });

async function exportCryptoKey(): Promise<Uint8Array> {
    const cryptoKey = await window.crypto.subtle.exportKey(
        'jwk', //can be "jwk" or "raw"
        keyPair, //extractable must be true
    );
    const cryptoKeyString = JSON.stringify(cryptoKey);
    const cryptoKeyToUint8Array = encoder.encode(cryptoKeyString);

    console.log(new Uint8Array(cryptoKeyToUint8Array));

    return cryptoKeyToUint8Array;
}

async function importCrypoKey(key: ArrayBuffer): Promise<CryptoKey> {
    // TYPO
    // const arrayFromCharCode = uint8ArrayFromCharCode(key);

    const importedKey = await window.crypto.subtle.importKey(
        'raw', //can be "jwk" or "raw"
        key,
        {
            //this is the algorithm options
            name: 'AES-GCM',
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ['encrypt', 'decrypt'], //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    );

    return importedKey;
}

async function encrypt(data: string): Promise<any> {
    const bufferData = encoder.encode(data);
    const encodedData = window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: window.crypto.getRandomValues(new Uint8Array(12)),

            //Tag length (optional)
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        keyPair, //from generateKey or importKey above
        bufferData, //ArrayBuffer of data you want to encrypt
    );

    return encodedData;
}

export async function getEncryptedData(key: string): Promise<IStoredPair> {
    const encryptedKey = await encrypt(key);
    const encryptedCryptoKey = await exportCryptoKey();
    const stringKey = JSON.stringify(encryptedCryptoKey);

    return { privateKey: encryptedKey, cryptoKey: stringKey };
}

export async function decryptPrivateKey(key: string, cryptoKey: any): Promise<string> {
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
