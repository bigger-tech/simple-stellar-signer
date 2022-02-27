// see https://docs.walletconnect.com/2.0/quick-start/dapps/client

import WalletConnectClient from '@walletconnect/client';
import { CLIENT_EVENTS } from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import type { PairingTypes } from '@walletconnect/types';

// const TESTNET = 'stellar:testnet';
const PUBNET = 'stellar:pubnet';
const STELLAR_METHODS = {
    SIGN: 'stellar_signXDR',
};
export default async function connectWithWalletConnect() {
    const client = await WalletConnectClient.init({
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
        relayUrl: 'wss://relay.walletconnect.org',
        metadata: {
            name: 'Simple Signer Stellar #3',
            description: 'Example Dapp',
            url: 'https://localhost:3000',
            icons: ['https://walletconnect.com/walletconnect-logo.png'],
        },
    });

    client.on(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
        // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
        const { uri } = proposal.signal.params;
        console.log(proposal);
        QRCodeModal.open(uri, () => QRCodeModal.close());
    });

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

    try {
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
        console.log(result);
    } catch (error) {
        console.log(error, 'last error');
    }
}
