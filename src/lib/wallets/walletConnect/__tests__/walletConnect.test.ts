/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';

import { AlreadyRunningError, NotRunningError } from '../../../errors/WalletConnectErrors';
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
    parseWalletConnectSession: jest.fn(),
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

    it('should connect if not connected when gettinng public key and return public key', async () => {
        jest.spyOn(mockServiceMethods, 'createWalletConnectClient').mockResolvedValueOnce({ example: '123' });
        jest.spyOn(mockServiceMethods, 'connectWalletConnect').mockResolvedValueOnce({ example: '123' });
        jest.spyOn(mockServiceMethods, 'parseWalletConnectSession').mockResolvedValueOnce({
            id: '123',
            name: 'example',
            description: 'example',
            url: 'example',
            icons: 'example',
            accounts: [{ network: 'example', publicKey: 'examplePublicKey' }],
        });

        const storage = new LocalStorage();
        const wallet = new WalletConnect(storage);

        const startedWallet = await wallet.start();
        const publicKey = await startedWallet.getPublicKey();

        expect(mockServiceMethods.parseWalletConnectSession).toBeCalledWith({ example: '123' });
        expect(publicKey).toBe('examplePublicKey');
    });
});
