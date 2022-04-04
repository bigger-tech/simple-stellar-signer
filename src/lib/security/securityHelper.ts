import type IDecryptableValue from './IDecryptableValue';

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

export async function decryptValue(decryptableValue: IDecryptableValue): Promise<string> {
    const valueCharCodes = uint8ArrayFromCharCode(decryptableValue.value);
    const privateKey = await importCryptoKey(decryptableValue.cryptoKey);

    const decryptedValue = await window.crypto.subtle.decrypt(
        {
            name: 'RSA-OAEP',
        },
        privateKey,
        valueCharCodes,
    );

    return new TextDecoder().decode(decryptedValue);
}

export async function encryptValue(value: string): Promise<IDecryptableValue> {
    const publicKey = (await keyPair).publicKey!;
    const encodedKey = new TextEncoder().encode(value);

    const encryptKey = async (publicKey: CryptoKey) => {
        return await window.crypto.subtle.encrypt(
            {
                name: 'RSA-OAEP',
            },
            publicKey,
            encodedKey,
        );
    };

    const uintArray = new Uint8Array(await encryptKey(publicKey));
    const encryptedValue = String.fromCharCode.apply(null, Array.from(uintArray));

    const encryptedCryptoKey = await exportCryptoKey();

    return { value: encryptedValue, cryptoKey: encryptedCryptoKey };
}

async function exportCryptoKey(): Promise<string> {
    const privateKey = (await keyPair).privateKey!;

    const cryptoKey = await window.crypto.subtle.exportKey('pkcs8', privateKey);
    const cryptoKeyToUint8Array = new Uint8Array(cryptoKey);
    return String.fromCharCode.apply(null, Array.from(cryptoKeyToUint8Array));
}

async function importCryptoKey(key: string): Promise<CryptoKey> {
    const arrayFromCharCode = uint8ArrayFromCharCode(key);

    return await window.crypto.subtle.importKey(
        'pkcs8',
        arrayFromCharCode,
        {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-256' },
        },
        false,
        ['decrypt'],
    );
}

function uint8ArrayFromCharCode(data: string): Uint8Array {
    return new Uint8Array([...data].map((char) => char.charCodeAt(0)));
}
