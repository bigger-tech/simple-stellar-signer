/* eslint-disable @typescript-eslint/no-var-requires */
import { expect } from '@jest/globals';
import SorobanClient from 'soroban-client';
import StellarSdk from 'stellar-sdk';
import { TextDecoder, TextEncoder } from 'util';

import LocalStorage from '../../../storage/storage';
import PrivateKey from '../PrivateKey';

global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
global.TextDecoder = TextDecoder;

jest.mock('../../../../constants', () => ({
    STELLAR_NETWORK: 'futurenet',
}));

jest.mock('soroban-client', () => {
    return {
        Keypair: {
            fromSecret: jest.fn(),
        },
        Transaction: {
            sign: jest.fn(),
            toXDR: jest.fn(),
        },
        Networks: {
            FUTURENET: 'Test SDF Future Network ; October 2022',
        },
    };
});

const mockTx = {
    sign: jest.fn(),
    toXDR: jest.fn(),
};

jest.mock('stellar-sdk', () => {
    return {
        Transaction: jest.fn().mockImplementation(() => mockTx),
    };
});

describe('Pivate Key management', () => {
    const storage = new LocalStorage();
    let wallet: PrivateKey;
    const privateKey = 'SANEPI74NFPALZ4JOUTRBOUJGVFOFRKRQT2BZN3UR5ULVEN4FJKT7GRF';
    const expectedPublicKey = 'FUTURENET';
    const signedTransaction = 'XDR_SIGNED_FUTURENET';

    beforeEach(() => {
        jest.clearAllMocks();
        wallet = new PrivateKey(storage);
    });
    it('Should show a private key from the Futurenet network', async () => {
        SorobanClient.Keypair.fromSecret.mockReturnValue({
            publicKey: jest.fn(() => expectedPublicKey),
        });
        const publickKey = await wallet.getPublicKey(privateKey);

        expect(publickKey).toEqual(expectedPublicKey);
    });
    it('Should sign a transaction successfully from the Futurenet network', async () => {
        jest.spyOn(mockTx, 'sign').mockImplementationOnce(() => signedTransaction);
        jest.spyOn(mockTx, 'toXDR').mockImplementationOnce(() => signedTransaction);
        SorobanClient.Keypair.fromSecret.mockReturnValue(() => expectedPublicKey);

        const signedXdr =
            'AAAAAgAAAAA2jYMwhev3yM7P+JWOv6kRQZAssek5zytAbbyhJbOjNQAAAGQAATOSAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAA2jYMwhev3yM7P+JWOv6kRQZAssek5zytAbbyhJbOjNQAAAAAF9eEAAAAAAAAAAAA=';
        const tx = new StellarSdk.Transaction(signedXdr, SorobanClient.Networks.FUTURENET);

        const transaction = await wallet.sign(tx);

        expect(transaction).toEqual(signedTransaction);
        expect(mockTx.sign).toHaveBeenCalledTimes(1);
        expect(SorobanClient.Keypair.fromSecret).toHaveBeenCalledTimes(1);
    });
});
