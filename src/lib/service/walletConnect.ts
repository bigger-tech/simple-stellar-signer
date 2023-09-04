import type { EngineTypes } from '@walletconnect/types';
import type { ISignClient } from '@walletconnect/types/dist/types/sign-client/client';
import type { SessionTypes } from '@walletconnect/types/dist/types/sign-client/session';

import { DAPP_BASE_URL, PROJECT_ID_FOR_WALLET_CONNECT } from '../../constants';
import {
    DisconnectError,
    MakeRequestError,
    NoConnectionError,
    NoSessionError,
    NotRunningError,
} from '../errors/WalletConnectErrors';
import { StellarNetwork } from '../stellar/StellarNetwork';
import { WCClient, WCModal } from './lib/walletconnect';

export type WalletConnectNetwork = 'testnet' | 'public';

export enum WalletConnectTargetChain {
    PUBLIC = 'stellar:pubnet',
    TESTNET = 'stellar:testnet',
}

export enum WalletConnectAllowedMethods {
    SIGN = 'stellar_signXDR',
}

export interface IWalletConnetConnectionParams {
    network: WalletConnectNetwork;
    methods: WalletConnectAllowedMethods[];
}

export interface IWalletConnectRequestParams {
    xdr: string;
    network: WalletConnectNetwork;
    method: WalletConnectAllowedMethods;
}

export class WalletConnectService {
    private readonly PROJECT_ID = PROJECT_ID_FOR_WALLET_CONNECT;
    private readonly PROJECT_URL = DAPP_BASE_URL;
    private readonly PROJECT_NAME = 'Simple Stellar Signer';
    private readonly PROJECT_DESCRIPTION =
        'Simple Signer provides an easy and secure way to implement log in and transaction signing functionality on your website for the Stellar network.';

    constructor(private client?: ISignClient) {
        this.client = client;
    }

    public async createClient(): Promise<ISignClient> {
        try {
            this.client = await WCClient.init({
                projectId: this.PROJECT_ID,
                metadata: {
                    name: this.PROJECT_NAME,
                    url: this.PROJECT_URL,
                    description: this.PROJECT_DESCRIPTION,
                    icons: [],
                },
            });

            return this.client;
        } catch (error) {
            console.error(error);
            throw new NoConnectionError();
        }
    }

    public async connect(params: IWalletConnetConnectionParams): Promise<SessionTypes.Struct> {
        if (!this.client) {
            throw new NotRunningError();
        }

        const { network, methods } = params;
        const walletConnectModal = new WCModal({ projectId: this.PROJECT_ID });

        const chains =
            network === StellarNetwork.PUBLIC ? [WalletConnectTargetChain.PUBLIC] : [WalletConnectTargetChain.TESTNET];

        const connectParams: EngineTypes.ConnectParams = {
            requiredNamespaces: {
                stellar: {
                    methods,
                    chains,
                    events: [],
                },
            },
        };

        try {
            const { uri, approval } = await this.client.connect(connectParams);

            return new Promise((resolve, reject) => {
                if (uri) {
                    walletConnectModal.openModal({ uri });
                }

                approval()
                    .then((session) => {
                        walletConnectModal.closeModal();
                        resolve(session);
                    })
                    .catch((error) => {
                        walletConnectModal.closeModal();
                        reject(error);
                    });
            });
        } catch (error: unknown) {
            console.error(error);
            throw new NoConnectionError();
        }
    }

    public async disconnect(sessionId: string): Promise<void> {
        if (!this.client) {
            throw new NotRunningError();
        }

        try {
            await this.client.disconnect({
                topic: sessionId,
                reason: {
                    message: 'Session closed',
                    code: -1,
                },
            });
        } catch (error: unknown) {
            console.error(error);
            throw new DisconnectError();
        }
    }

    public async disconnectAllSessions(): Promise<void> {
        if (!this.client) {
            throw new NotRunningError();
        }

        const sessions = this.client.session.getAll();

        if (sessions.length) {
            const closedSessionsPromises = sessions.map((session) => this.disconnect(session.topic));
            await Promise.all(closedSessionsPromises);
        }
    }

    public async makeRequest(params: IWalletConnectRequestParams): Promise<{ signedXDR: string }> {
        if (!this.client) {
            throw new NotRunningError();
        }

        const { xdr, network, method } = params;

        const lastKeyIndex = this.client.session.getAll().length - 1;
        const lastSession = this.client.session.getAll()[lastKeyIndex];

        if (!lastSession) {
            throw new NoSessionError();
        }

        const chain =
            network === StellarNetwork.PUBLIC ? WalletConnectTargetChain.PUBLIC : WalletConnectTargetChain.TESTNET;

        try {
            return await this.client.request({
                topic: lastSession.topic,
                chainId: chain,
                request: {
                    method,
                    params: { xdr },
                },
            });
        } catch (error: unknown) {
            console.error(error);
            throw new MakeRequestError();
        }
    }
}
