import type { IStoredPair } from '../routes/connect/IStoredPair';
const encoder = new TextEncoder();
let arrayBufferIv: any;
function arrayUint() {
    const uint = window.crypto.getRandomValues(new Uint8Array(12));
    arrayBufferIv = uint;
    return arrayBufferIv;
}

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

    return cryptoKeyToUint8Array;
}

async function importCrypoKey(key: string): Promise<CryptoKey> {
    // TYPO
    // const arrayFromCharCode = uint8ArrayFromCharCode(key);
    const bufferKey = JSON.parse(key);
    const importedKey = await window.crypto.subtle.importKey(
        'raw', //can be "jwk" or "raw"
        bufferKey,
        {
            //this is the algorithm options
            name: 'AES-GCM',
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ['encrypt', 'decrypt'], //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    );

    return importedKey;
}

async function encrypt(data: string): Promise<ArrayBufferLike> {
    const bufferData = encoder.encode(data);
    const encodedData = window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: arrayUint(),

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

    const uintArray = new Uint8Array(encryptedKey);
    const stringArray = String.fromCharCode.apply(null, Array.from(uintArray));
    console.log(stringArray);

    return { privateKey: stringArray, cryptoKey: stringKey };
}

export async function decryptPrivateKey(key: string, cryptoKey: string): Promise<string> {
    const arrayFromCharCode = uint8ArrayFromCharCode(key);
    const privateKey = await importCrypoKey(cryptoKey);

    const decryptedKey = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: arrayBufferIv, //The initialization vector you used to encrypt
        },
        privateKey, //from generateKey or importKey above
        arrayFromCharCode, //ArrayBuffer of the data
    );

    const decoderData = new TextDecoder().decode(decryptedKey);
    return decoderData;
}
