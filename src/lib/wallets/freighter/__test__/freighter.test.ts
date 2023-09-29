/* eslint-disable @typescript-eslint/no-var-requires */
import { expect } from '@jest/globals';
import { signTransaction } from '@stellar/freighter-api';
import SorobanClient from 'soroban-client';

import { StellarNetwork } from '../../../stellar/StellarNetwork';
import LocalStorage from '../../../storage/storage';
import Freighter from '../Freighter';

jest.mock('../../../../constants', () => ({
    STELLAR_NETWORK: 'futurenet',
}));

jest.mock('@stellar/freighter-api', () => ({
    signTransaction: jest.fn(),
}));

jest.mock('stellar-sdk', () => {
    return {
        Transaction: {
            sign: jest.fn(),
            toXDR: jest.fn(),
        },
    };
});

describe('Freighter management', () => {
    const storage = new LocalStorage();
    let freighter: Freighter;
    const freighterNetwork = StellarNetwork.FUTURENET.toUpperCase();

    beforeEach(() => {
        jest.clearAllMocks();
        freighter = new Freighter(storage);
    });
    it('Should sign a transaction successfully from the Futurenet network', async () => {
        const signedXdr =
            'AAAAAgAAAAA2jYMwhev3yM7P+JWOv6kRQZAssek5zytAbbyhJbOjNQAAAGQAATOSAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAA2jYMwhev3yM7P+JWOv6kRQZAssek5zytAbbyhJbOjNQAAAAAF9eEAAAAAAAAAAAA=';
        const tx = SorobanClient.TransactionBuilder.fromXDR(signedXdr, SorobanClient.Networks.FUTURENET);
        await freighter.sign(tx);

        expect(freighter.freighterNetwork).toEqual(freighterNetwork);
        expect(signTransaction).toHaveBeenCalledWith(signedXdr, {
            network: freighterNetwork,
        });
        expect(signTransaction).toHaveBeenCalledTimes(1);
    });
});
