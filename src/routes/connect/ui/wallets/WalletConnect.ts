import WalletConnectClient from '@walletconnect/client';
import { CLIENT_EVENTS } from '@walletconnect/client';
import type { Client } from '@walletconnect/client/dist/cjs/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import type { PairingTypes, SessionTypes } from '@walletconnect/types';
import { getItem } from '../../../../helpers/storage';
import type { Transaction } from 'stellar-sdk';
import AbstractWallet from './AbstractWallet';
import type IWalletConnect from './interfaces/IWalletConnect';

const PUBNET = 'stellar:pubnet';
const STELLAR_METHODS = {
    SIGN: 'stellar_signXDR',
};

export default class WalletConnect extends AbstractWallet implements IWalletConnect {
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
    async sign(tx: Transaction) {
        const sessionLocalStorage = getItem('wc@2:client:0.3//session:settled');
        const session = await JSON.parse(sessionLocalStorage!);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        const result = await client.request({
            topic: session[0]!.topic,
            chainId: PUBNET,
            request: {
                method: 'stellar_signXDR',
                params: {
                    xdr: tx,
                },
            },
        });
        return result;
    }

    async getPublicKey(session: SessionTypes.Settled) {
        const publicKey = session.state.accounts[0]!.match(/([A-Z])\w+/);
        return publicKey![0];
    }

    async logIn() {
        const client = await this.initClient();
        await this.createPairing(client);
        const session = await this.createSession(client);
        const publicKey = await this.getPublicKey(session);
        if (publicKey) {
            super.connectWithWallet(WalletConnect.NAME, publicKey);
        }
        return client;
    }
}
