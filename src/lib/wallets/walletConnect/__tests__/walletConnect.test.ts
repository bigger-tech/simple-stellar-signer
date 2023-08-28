/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import { Transaction } from 'stellar-sdk';

import {
    AlreadyRunningError,
    NoPublicKeyError,
    NoSessionError,
    NotRunningError,
} from '../../../errors/WalletConnectErrors';
import { WallletConnectService } from '../../../service/walletConnect';
import LocalStorage from '../../../storage/storage';
import WalletConnect from '../WalletConnect';

jest.mock('../../../../constants', () => ({
    PROJECT_ID_FOR_WALLET_CONNECT: 'exampleId',
    DAPP_BASE_URL: 'exampleUrl',
}));
const mockServiceMethods = {
    connectWalletConnect: jest.fn(),
    createWalletConnectClient: jest.fn(),
    makeWalletConnectRequest: jest.fn(),
};
jest.mock('../../../service/walletConnect', () => {
    return {
        WallletConnectService: jest.fn().mockImplementation(() => {
            return mockServiceMethods;
        }),
        WalletConnectAllowedMethods: jest.fn().mockImplementation(() => {
            return { SIGN: 'example-method' };
        }),
    };
});
describe('start', () => {
    it('should create instance of service', () => {
        const storage = new LocalStorage();
        new WalletConnect(storage);

        expect(WallletConnectService).toHaveBeenCalledTimes(1);
    });

    it('should run the createWalletConnectClient method when wallet starts and throw error if already running', async () => {
        jest.spyOn(mockServiceMethods, 'createWalletConnectClient').mockResolvedValueOnce({ example: '123' });

        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);
        const startedWallet = await wallet.start();

        expect(mockServiceMethods.createWalletConnectClient).toBeCalledTimes(1);
        expect(startedWallet).toBeInstanceOf(WalletConnect);

        try {
            await startedWallet.start();
        } catch (error) {
            expect(error).toStrictEqual(new AlreadyRunningError());
        }
    });
});

describe('getPublicKey', () => {
    it('should throw error if wallet is not running', async () => {
        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);

        try {
            await wallet.getPublicKey();
        } catch (error) {
            expect(error).toStrictEqual(new NotRunningError());
        }
    });

    it('should throw error if there is no public key', async () => {
        const ACCOUNT_STR = '';

        jest.spyOn(mockServiceMethods, 'createWalletConnectClient').mockResolvedValueOnce({
            session: { getAll: () => [] },
        });
        jest.spyOn(mockServiceMethods, 'connectWalletConnect').mockResolvedValueOnce({
            namespaces: { stellar: { accounts: [ACCOUNT_STR] } },
        });

        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);
        const startedWallet = await wallet.start();

        try {
            await startedWallet.getPublicKey();
        } catch (error) {
            expect(error).toStrictEqual(new NoPublicKeyError());
        }
    });

    it('should connect if not connected when gettinng public key and return public key', async () => {
        const ACCOUNT_STR = 'stellar:pubnet:examplePublicKey';

        jest.spyOn(mockServiceMethods, 'createWalletConnectClient').mockResolvedValueOnce({
            session: { getAll: () => [] },
        });
        jest.spyOn(mockServiceMethods, 'connectWalletConnect').mockResolvedValueOnce({
            namespaces: { stellar: { accounts: [ACCOUNT_STR] } },
        });

        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);

        const startedWallet = await wallet.start();
        const publicKey = await startedWallet.getPublicKey();

        expect(publicKey).toBe('examplePublicKey');
    });
});

describe('sign', () => {
    const XDR =
        'AAAAAgAAAABX4uoX9fxBmYuL+JXfoQmb/cImN/E7lc4HPF5r2u0i+QAAAGQAEunYAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAABX4uoX9fxBmYuL+JXfoQmb/cImN/E7lc4HPF5r2u0i+QAAAAAAAAAAAJiWgAAAAAAAAAAA';

    const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

    it('should throw error if wallet is not running', async () => {
        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);

        try {
            await wallet.sign(new Transaction(XDR, NETWORK_PASSPHRASE));
        } catch (error) {
            expect(error).toStrictEqual(new NotRunningError());
        }
    });

    it('should throw error if there is no session', async () => {
        jest.spyOn(mockServiceMethods, 'createWalletConnectClient').mockResolvedValueOnce({
            session: { getAll: () => [] },
        });

        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);
        const startedWallet = await wallet.start();

        try {
            await startedWallet.sign(new Transaction(XDR, NETWORK_PASSPHRASE));
        } catch (error) {
            expect(error).toStrictEqual(new NoSessionError());
        }
    });

    it('should return a signed XDR', async () => {
        jest.spyOn(mockServiceMethods, 'createWalletConnectClient').mockResolvedValueOnce({
            session: { getAll: () => [{}] },
        });

        jest.spyOn(mockServiceMethods, 'makeWalletConnectRequest').mockResolvedValueOnce({
            signedXDR: 'exampleSignedXDR',
        });

        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);
        const startedWallet = await wallet.start();
        const signedXDR = await startedWallet.sign(new Transaction(XDR, NETWORK_PASSPHRASE));

        expect(signedXDR).toBe('exampleSignedXDR');
    });
});
