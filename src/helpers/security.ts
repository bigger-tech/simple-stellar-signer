/* eslint-disable @typescript-eslint/no-non-null-assertion */
const generateKeyPair = async () => {
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

    return keyPair;
};

const keyPair = await generateKeyPair();

export const exportCryptoKey = async (): Promise<ArrayBuffer> => {
    const privateKey = keyPair.privateKey;

    const keydata = await window.crypto.subtle.exportKey(
        'pkcs8', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        privateKey!, //can be a publicKey or privateKey, as long as extractable was true
    );

    return keydata;
};

export const encryptPrivateKey = async (key: string) => {
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

const importCrypoKey = async () => {
    const getKeyFromSession = window.sessionStorage.getItem('cryptoKey');

    const uintArrayEight = new Uint8Array([...getKeyFromSession!].map((char) => char.charCodeAt(0)));

    const importedKey = await window.crypto.subtle
        .importKey(
            'pkcs8', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            uintArrayEight,
            {
                //these are the algorithm options
                name: 'RSA-OAEP',
                hash: { name: 'SHA-256' }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ['decrypt'], //"encrypt" or "wrapKey" for public key import or
            //"decrypt" or "unwrapKey" for private key imports
        )
        .catch(function (err) {
            console.error(err);
        });

    return importedKey;
};

export const decryptPrivateKey = async (charCodeString: string) => {
    const uintArrayEight = new Uint8Array([...charCodeString].map((char) => char.charCodeAt(0)));

    const privateKey = await importCrypoKey();

    const decryptedKey = await window.crypto.subtle
        .decrypt(
            {
                name: 'RSA-OAEP',
                //label: Uint8Array([...]) //optional
            },
            privateKey!, //from generateKey or importKey above
            uintArrayEight, //ArrayBuffer of the data
        )
        .then(function (decrypted) {
            //returns an ArrayBuffer containing the decrypted data
            console.log(new Uint8Array(decrypted));
            return decrypted;
        })
        .catch(function (err) {
            console.error(err);
        });

    const decoderData = new TextDecoder().decode(decryptedKey);
    return decoderData;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
};
