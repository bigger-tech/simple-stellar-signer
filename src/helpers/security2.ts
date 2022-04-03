export async function testCrypto() {
    const SECRET_DATA = 'Me llamo Viktor';
    const arrayBuffer = window.crypto.getRandomValues(new Uint8Array(12));

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

    const cryptoKey = await generateKey();

    async function exportKey() {
        const key = await window.crypto.subtle.exportKey(
            'raw', //can be "jwk" or "raw"
            cryptoKey, //extractable must be true
        );
        const uintArray = new Uint8Array(key);
        const stringArray = String.fromCharCode.apply(null, Array.from(uintArray));

        return stringArray;
    }

    const exportedKey = await exportKey();

    async function encryptData() {
        const data = new TextEncoder().encode(SECRET_DATA);
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: arrayBuffer,
                tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
            },
            cryptoKey, //from generateKey or importKey above
            data, //ArrayBuffer of data you want to encrypt
        );

        const uintArray = new Uint8Array(encryptedData);
        const stringArray = String.fromCharCode.apply(null, Array.from(uintArray));
        return stringArray;
    }

    const encryptedData = await encryptData();

    // DECRYPT PART

    async function importKey() {
        const arrayFromCharCode = uint8ArrayFromCharCode(exportedKey);
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

    const importedKey = await importKey();

    async function decrypt() {
        const arrayFromCharCode = uint8ArrayFromCharCode(encryptedData);
        const decryptData = await window.crypto.subtle
            .decrypt(
                {
                    name: 'AES-GCM',
                    iv: arrayBuffer, //The initialization vector you used to encrypt
                    tagLength: 128, //The tagLength you used to encrypt (if any)
                },
                importedKey, //from generateKey or importKey above
                arrayFromCharCode, //ArrayBuffer of the data
            )
            .catch((e) => {
                console.error(e);
            });

        const decodedData = new TextDecoder().decode(decryptData);

        return decodedData;
    }

    const decryptedData = await decrypt();
    console.log({ cryptoKey, exportedKey, encryptedData, importedKey, decryptedData });
}
