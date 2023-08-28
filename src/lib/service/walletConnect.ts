import { WalletConnectModal } from '@walletconnect/modal';
import { SignClient } from '@walletconnect/sign-client';
import type { ISignClient } from '@walletconnect/types/dist/types/sign-client/client';
import type { SessionTypes } from '@walletconnect/types/dist/types/sign-client/session';

import { CannotParseError, NoConnectionError } from '../errors/WalletConnectErrors';
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

export interface IParsedWalletConnectSession {
    id: string;
    name: string;
    description: string;
    url: string;
    icons: string;
    accounts: Array<{
        network: WalletConnectNetwork;
        publicKey: string;
    }>;
}

export class WallletConnectService {
    private projectId: string;

    constructor(projectId: string) {
        this.projectId = projectId;
    }

    public async createWalletConnectClient(params: IWalletConnetCreateClientParams): Promise<ISignClient> {
        const { name, description, url, icons } = params;

        return SignClient.init({
            projectId: this.projectId,
            metadata: {
                name,
                url,
                description,
                icons,
            },
        });
    }

    public async connectWalletConnect(params: IWalletConnetConnectionParams): Promise<SessionTypes.Struct> {
        const { client, network, methods } = params;

        const walletConnectModal = new WalletConnectModal({ projectId: this.projectId });

        const chains =
            network === StellarNetwork.PUBLIC ? [WalletConnectTargetChain.PUBLIC] : [WalletConnectTargetChain.TESTNET];

        try {
            const { uri, approval } = await client.connect({
                requiredNamespaces: {
                    stellar: {
                        methods,
                        chains,
                        events: [],
                    },
                },
            });

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

    public parseWalletConnectSession(session: SessionTypes.Struct): IParsedWalletConnectSession {
        const stellarNamespace = session.namespaces['stellar'];

        if (!stellarNamespace || !stellarNamespace.accounts.length) {
            throw new CannotParseError();
        }

        const accounts = stellarNamespace.accounts.map((account: string) => ({
            network: account.split(':')[1] as WalletConnectNetwork,
            publicKey: account.split(':')[2] as string,
        }));

        return {
            id: session.topic,
            name: session.peer.metadata.name,
            description: session.peer.metadata.description,
            url: session.peer.metadata.url,
            icons: session.peer.metadata.icons[0] as string,
            accounts,
        };
    }
}
