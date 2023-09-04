import { expect } from '@jest/globals';

import {
    DisconnectError,
    MakeRequestError,
    NoConnectionError,
    NoSessionError,
    NotRunningError,
} from '../../../lib/errors/WalletConnectErrors';
import { StellarNetwork } from '../../../lib/stellar/StellarNetwork';
import { WCClient } from '../lib/walletconnect';
import {
    IWalletConnectRequestParams,
    IWalletConnetConnectionParams,
    WalletConnectAllowedMethods,
    WalletConnectNetwork,
    WalletConnectService,
    WalletConnectTargetChain,
} from '../walletConnect';

const NO_CONNECTION_ERROR = new NoConnectionError();
const DISCCONECT_ERROR = new DisconnectError();
const NO_SESSION_ERROR = new NoSessionError();
const MAKE_REQUEST_ERROR = new MakeRequestError();
const NOT_RUNNING_ERROR = new NotRunningError();

const mockClientMethods = {
    init: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    request: jest.fn(),
    session: { getAll: jest.fn() },
};

const mockModalMethods = {
    openModal: jest.fn(),
    closeModal: jest.fn(),
};

jest.mock('../../../constants', () => ({
    PROJECT_ID_FOR_WALLET_CONNECT: 'exampleId',
    DAPP_BASE_URL: 'exampleUrl',
    HORIZON_NETWORK_PASSPHRASE: 'Test SDF Network ; September 2015',
}));

jest.mock('../lib/walletconnect', () => {
    return {
        WCClient: {
            init: () => mockClientMethods,
        },
        WCModal: jest.fn().mockImplementation(() => {
            return mockModalMethods;
        }),
    };
});

describe('Wallet Connect Service', () => {
    let service: WalletConnectService;
    const ERROR = new Error();
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const SESSION_ID = 'test';
    const sessions = [{ topic: SESSION_ID }];

    beforeEach(() => {
        jest.clearAllMocks();
        service = new WalletConnectService();
    });

    describe('createClient', () => {
        it('should set and return the client', async () => {
            jest.spyOn(WCClient, 'init');

            const client = await service.createClient();

            expect(WCClient.init).toBeCalledTimes(1);
            expect(client).toStrictEqual(mockClientMethods);
        });

        it('should throw a no connection error if init client fails', async () => {
            jest.spyOn(WCClient, 'init').mockRejectedValueOnce(ERROR);

            try {
                await service.createClient();
            } catch (error) {
                expect(consoleError).toBeCalledTimes(1);
                expect(error).toStrictEqual(NO_CONNECTION_ERROR);
            }
        });
    });

    describe('connect', () => {
        const connectionParamas = {
            network: 'testnet' as WalletConnectNetwork,
            methods: [WalletConnectAllowedMethods.SIGN],
        } as IWalletConnetConnectionParams;

        const requestConnect = {
            requiredNamespaces: {
                stellar: {
                    methods: connectionParamas.methods,
                    chains: [WalletConnectTargetChain.TESTNET],
                    events: [],
                },
            },
        };

        const responseConnect = {
            uri: 'uri',
            approval: () => new Promise((resolve) => resolve({})),
        };

        it('should call openModal if there is URI and should return a session', async () => {
            jest.spyOn(mockClientMethods, 'connect').mockResolvedValueOnce(responseConnect);

            await service.createClient();
            await service.connect(connectionParamas);

            expect(mockClientMethods.connect).toBeCalledWith(requestConnect);
            expect(mockModalMethods.openModal).toBeCalled();
            expect(mockModalMethods.closeModal).toBeCalled();
        });

        it('should not call openModal if there is no URI and should return a session', async () => {
            jest.spyOn(mockClientMethods, 'connect').mockResolvedValueOnce({ ...responseConnect, uri: undefined });

            await service.createClient();
            await service.connect(connectionParamas);

            expect(mockClientMethods.connect).toBeCalledWith(requestConnect);
            expect(mockModalMethods.openModal).not.toHaveBeenCalled();
            expect(mockModalMethods.closeModal).toBeCalled();
        });

        it('should throw a no connection error if connect fails', async () => {
            jest.spyOn(mockClientMethods, 'connect').mockRejectedValueOnce(ERROR);

            await service.createClient();

            try {
                await service.connect(connectionParamas);
            } catch (error) {
                expect(consoleError).toBeCalledTimes(1);
                expect(error).toStrictEqual(NO_CONNECTION_ERROR);
            }
        });

        it('should throw a not running error if client is not running', async () => {
            try {
                await service.connect(connectionParamas);
            } catch (error) {
                expect(error).toStrictEqual(NOT_RUNNING_ERROR);
            }
        });
    });

    describe('disconnect', () => {
        const DISCONNECT_MESSAGE = 'Session closed';
        const DISCONNECT_CODE = -1;

        it('should disconnect a session', async () => {
            const requestDisconnect = {
                topic: SESSION_ID,
                reason: {
                    message: DISCONNECT_MESSAGE,
                    code: DISCONNECT_CODE,
                },
            };

            jest.spyOn(mockClientMethods, 'disconnect').mockImplementationOnce(() => Promise.resolve());

            await service.createClient();
            await service.disconnect(SESSION_ID);

            expect(mockClientMethods.disconnect).toBeCalledWith(requestDisconnect);
        });

        it('should throw a disconnect error if dicsonnect fails', async () => {
            jest.spyOn(mockClientMethods, 'disconnect').mockRejectedValueOnce(ERROR);

            await service.createClient();

            try {
                await service.disconnect(SESSION_ID);
            } catch (error) {
                expect(error).toStrictEqual(DISCCONECT_ERROR);
                expect(consoleError).toBeCalledTimes(1);
            }
        });

        it('should throw a not running error if client is not running', async () => {
            try {
                await service.disconnect(SESSION_ID);
            } catch (error) {
                expect(error).toStrictEqual(NOT_RUNNING_ERROR);
            }
        });
    });

    describe('disconnectAllSessions', () => {
        it('should disconnect all sessions', async () => {
            jest.spyOn(mockClientMethods, 'disconnect').mockImplementationOnce(() => Promise.resolve());
            jest.spyOn(mockClientMethods.session, 'getAll').mockImplementation(() => sessions);

            await service.createClient();
            await service.disconnectAllSessions();

            expect(mockClientMethods.disconnect).toBeCalledTimes(sessions.length);
        });

        it('should throw a not running error if client is not running', async () => {
            try {
                await service.disconnectAllSessions();
            } catch (error) {
                expect(error).toStrictEqual(NOT_RUNNING_ERROR);
            }
        });
    });

    describe('makeRequest', () => {
        const XDR = 'xdr';

        const makeRequestParams = {
            xdr: XDR,
            network: StellarNetwork.TESTNET,
            method: WalletConnectAllowedMethods.SIGN,
        } as IWalletConnectRequestParams;

        it('should make the request with the correct params', async () => {
            const requestParams = {
                topic: SESSION_ID,
                chainId: WalletConnectTargetChain.TESTNET,
                request: {
                    method: WalletConnectAllowedMethods.SIGN,
                    params: { xdr: XDR },
                },
            };

            jest.spyOn(mockClientMethods, 'request').mockResolvedValueOnce({});
            jest.spyOn(mockClientMethods.session, 'getAll').mockImplementation(() => sessions);

            await service.createClient();
            await service.makeRequest(makeRequestParams);

            expect(mockClientMethods.session.getAll).toBeCalledTimes(2);
            expect(mockClientMethods.request).toBeCalledWith(requestParams);
        });

        it('should throw a meke request error if the request fails', async () => {
            jest.spyOn(mockClientMethods, 'request').mockRejectedValueOnce(ERROR);
            jest.spyOn(mockClientMethods.session, 'getAll').mockImplementation(() => [{ topic: 'test' }]);

            await service.createClient();

            try {
                await service.makeRequest(makeRequestParams);
            } catch (error) {
                expect(consoleError).toBeCalledTimes(1);
                expect(error).toStrictEqual(MAKE_REQUEST_ERROR);
            }
        });

        it('should throw a no session error if there is no session', async () => {
            jest.spyOn(mockClientMethods.session, 'getAll').mockImplementation(() => []);

            await service.createClient();

            try {
                await service.makeRequest(makeRequestParams);
            } catch (error) {
                expect(error).toStrictEqual(NO_SESSION_ERROR);
            }
        });

        it('should throw a not running error if client is not running', async () => {
            try {
                await service.makeRequest(makeRequestParams);
            } catch (error) {
                expect(error).toStrictEqual(NOT_RUNNING_ERROR);
            }
        });
    });
});
