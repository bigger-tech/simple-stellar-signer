import WalletConnectClient from '@walletconnect/client';
import { CLIENT_EVENTS } from '@walletconnect/client';
import type { Client } from '@walletconnect/client/dist/cjs/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import type { PairingTypes, SessionTypes } from '@walletconnect/types';

// import { sendMessage } from '../../../../helpers/sendMessageHelpers';
import type IWalletConnect from './interfaces/IWalletConnect';

const PUBNET = 'stellar:pubnet';
const STELLAR_METHODS = {
    SIGN: 'stellar_signXDR',
};

export default class WalletConnect implements IWalletConnect {
    public static NAME = 'walletconnect';

    async initClient() {
        const client = await WalletConnectClient.init({
            projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
                name: 'Simple Signer Stellar #3',
                description: 'Example Dapp',
                url: 'https://localhost:3000/',
                icons: ['https://walletconnect.com/walletconnect-logo.png'],
            },
        });
        return client;
    }

    async createPairing(client: Client) {
        client.on(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
            const { uri } = proposal.signal.params;
            console.log('create pairing');
            QRCodeModal.open(uri, async () => QRCodeModal.close());
            console.log(proposal, 'proposal');
        });
    }

    async createSession(client: Client) {
        const session = await client.connect({
            permissions: {
                blockchain: {
                    chains: [PUBNET],
                },
                jsonrpc: {
                    methods: [STELLAR_METHODS.SIGN],
                },
            },
        });
        return session;
    }
    async deleteSession(session: SessionTypes.Settled, client: Client) {
        client.disconnect({
            topic: session.topic,
            reason: {
                code: 0,
                message: 'Disconnecting WalletConnect from Simple Signer for additional security',
            },
        });
    }
    async sign(session: SessionTypes.RequestParams, client: Client) {
        const result = await client.request({
            topic: session.topic,
            chainId: PUBNET,
            request: {
                method: 'stellar_signXDR',
                params: {
                    xdr: 'AAAAAgAAAACs3d1Ffb9O6rqEUlrxKCPte210i4eyOUvlZh/M1QUZKAAAAGQCXVArAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAACs3d1Ffb9O6rqEUlrxKCPte210i4eyOUvlZh/M1QUZKAAAAAAAAAAAAJiWgAAAAAAAAAAA',
                },
            },
        });
        return result;
    }
}
// const TESTNET = 'stellar:testnet';
// const PUBNET = 'stellar:pubnet';
// const STELLAR_METHODS = {
//     SIGN: 'stellar_signXDR',
// };
// export let clientAndSessionArray: (WalletConnectClient | SessionTypes.Settled)[];

// export default async function connectWithWalletConnect() {
//     const client = await WalletConnectClient.init({
//         projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
//         relayUrl: 'wss://relay.walletconnect.org',
//         metadata: {
//             name: 'Simple Signer Stellar #3',
//             description: 'Example Dapp',
//             url: 'https://localhost:3000',
//             icons: ['https://walletconnect.com/walletconnect-logo.png'],
//         },
//     });

//     client.on(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
//         const { uri } = proposal.signal.params;
//         QRCodeModal.open(uri, async () => QRCodeModal.close());
//     });

//     const session = await client.connect({
//         permissions: {
//             blockchain: {
//                 chains: [PUBNET],
//             },
//             jsonrpc: {
//                 methods: [STELLAR_METHODS.SIGN],
//             },
//         },
//     });
// }

// export async function sign() {
//     const client = await WalletConnectClient.init({
//         projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
//         relayUrl: 'wss://relay.walletconnect.org',
//         metadata: {
//             name: 'Simple Signer Stellar',
//             description: 'Use Simple Signer to easily support multiple wallets',
//             url: 'https://localhost:3000',
//             icons: ['https://walletconnect.com/walletconnect-logo.png'],
//         },
//     });

//     let sessions = client.session.values;
//     client.on(CLIENT_EVENTS.session.sync, () => {
//         sessions = client.session.values;
//     });

//     const currentSession = sessions.map((session) => {
//         console.log(session);
//     });
//     console.log(sessions);
//     const result = await client.request({
//         topic: currentSession!.topic,
//         chainId: PUBNET,
//         request: {
//             method: 'stellar_signXDR',
//             params: {
//                 xdr: 'AAAAAgAAAACs3d1Ffb9O6rqEUlrxKCPte210i4eyOUvlZh/M1QUZKAAAAGQCXVArAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAACs3d1Ffb9O6rqEUlrxKCPte210i4eyOUvlZh/M1QUZKAAAAAAAAAAAAJiWgAAAAAAAAAAA',
//             },
//         },
//     });
//     console.log(result);
//     return result;
// }
