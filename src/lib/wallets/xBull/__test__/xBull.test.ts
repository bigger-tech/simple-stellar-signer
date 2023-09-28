import { expect } from '@jest/globals';
import SorobanClient from 'soroban-client';

import LocalStorage from '../../../storage/storage';
import XBull from '../XBull';

jest.mock('../../../../constants', () => ({
    STELLAR_NETWORK: 'futurenet',
}));

jest.mock('stellar-sdk', () => {
    return {
        Transaction: {
            toXDR: jest.fn(),
        },
    };
});

const mockBridge = {
    sign: jest.fn(),
    closeConnections: jest.fn(),
};

jest.mock('@creit-tech/xbull-wallet-connect', () => {
    return {
        xBullWalletConnect: jest.fn().mockImplementationOnce(() => mockBridge),
    };
});

describe('xBull management', () => {
    const storage = new LocalStorage();
    const xBull = new XBull(storage);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should sign a transaction successfully from the Futurenet network', async () => {
        const responseXdr = 'XDR_FUTURENET';
        jest.spyOn(mockBridge, 'sign').mockImplementationOnce(() => responseXdr);
        jest.spyOn(mockBridge, 'closeConnections').mockReturnValue(() => '');

        const signedXdr =
            'AAAAAgAAAAA2jYMwhev3yM7P+JWOv6kRQZAssek5zytAbbyhJbOjNQAAAGQAATOSAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAA2jYMwhev3yM7P+JWOv6kRQZAssek5zytAbbyhJbOjNQAAAAAF9eEAAAAAAAAAAAA=';
        const tx = SorobanClient.TransactionBuilder.fromXDR(signedXdr, SorobanClient.Networks.STANDALONE);

        const result = await xBull.sign(tx);

        expect(result).toBe(responseXdr);
        expect(xBull.XBullNetwork).toEqual('futurenet');
        expect(mockBridge.sign).toHaveBeenCalledTimes(1);
        expect(mockBridge.sign).toHaveBeenLastCalledWith({ xdr: signedXdr, network: 'futurenet' });
    });
});
