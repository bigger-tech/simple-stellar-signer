import { WalletConnectModal } from '@walletconnect/modal';
import { SignClient } from '@walletconnect/sign-client';
import type { EngineTypes } from '@walletconnect/types';
import type { ISignClient } from '@walletconnect/types/dist/types/sign-client/client';
import type { SessionTypes } from '@walletconnect/types/dist/types/sign-client/session';

import { DisconnectError, MakeRequestError, NoConnectionError } from '../errors/WalletConnectErrors';
import { StellarNetwork } from '../stellar/StellarNetwork';

export type WalletConnectNetwork = 'testnet' | 'pubnet' | 'public';

export enum WalletConnectTargetChain {
    PUBLIC = 'stellar:pubnet',
    TESTNET = 'stellar:testnet',
}

export enum WalletConnectAllowedMethods {
    SIGN = 'stellar_signXDR',
}

export interface IWalletConnetCreateClientParams {
    name: string;
    description: string;
    url: string;
    icons: string[];
}

export interface IWalletConnetConnectionParams {
    client: ISignClient;
    network: WalletConnectNetwork;
    methods: WalletConnectAllowedMethods[];
}

export interface IWalletConnectDisconnectParams {
    client: ISignClient;
    sessionId: string;
}

export interface IWalletConnectRequestParams {
    client: ISignClient;
    xdr: string;
    topic: string;
    network: WalletConnectNetwork;
    method: WalletConnectAllowedMethods;
}

export class WallletConnectService {
    private projectId: string;

    constructor(projectId: string) {
        this.projectId = projectId;
    }

    public async createClient(params: IWalletConnetCreateClientParams): Promise<ISignClient> {
        const { name, description, url, icons } = params;

        try {
            return SignClient.init({
                projectId: this.projectId,
                metadata: {
                    name,
                    url,
                    description,
                    icons,
                },
            });
        } catch (error) {
            console.error(error);
            throw new NoConnectionError();
        }
    }

    public async connect(params: IWalletConnetConnectionParams): Promise<SessionTypes.Struct> {
        const { client, network, methods } = params;

        const walletConnectModal = new WalletConnectModal({ projectId: this.projectId });

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
            const { uri, approval } = await client.connect(connectParams);

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
            walletConnectModal.closeModal();
            throw new NoConnectionError();
        }
    }

    public async disconnect(params: IWalletConnectDisconnectParams): Promise<void> {
        const { client, sessionId } = params;

        try {
            await client.disconnect({
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

    public async makeRequest(params: IWalletConnectRequestParams): Promise<{ signedXDR: string }> {
        const { client, xdr, topic, network, method } = params;

        const chain =
            network === StellarNetwork.PUBLIC ? WalletConnectTargetChain.PUBLIC : WalletConnectTargetChain.TESTNET;

        try {
            return client.request({
                topic: topic,
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
