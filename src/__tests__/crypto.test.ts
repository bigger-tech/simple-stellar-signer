/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';

it('should work', async () => {
    // const keyPair = window.crypto.subtle.generateKey(
    //     {
    //         name: 'RSA-OAEP',
    //         modulusLength: 4096,
    //         publicExponent: new Uint8Array([1, 0, 1]),
    //         hash: { name: 'SHA-256' },
    //     },
    //     true,
    //     ['encrypt', 'decrypt'],
    // );

    console.log(
        window.crypto.subtle.generateKey(
            {
                name: 'AES-GCM',
                length: 256,
            },
            true,
            ['encrypt', 'decrypt'],
        ),
    );

    // console.log(await keyPair);
    expect;
});
