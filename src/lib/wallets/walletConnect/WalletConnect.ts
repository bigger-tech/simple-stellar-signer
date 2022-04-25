/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import WalletConnectClient from '@walletconnect/client';
import { CLIENT_EVENTS } from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import type { PairingTypes } from '@walletconnect/types';
import type { Transaction } from 'stellar-sdk';

import { walletConnect } from '../../../assets/index';
import signedXDR from '../../../lib/components/transaction/transactionStore';
import type IStorage from '../../storage/IStorage';
import LocalStorage from '../../storage/storage';
import AbstractWallet from '../AbstractWallet';

const storage = new LocalStorage();
const getItem = storage.getItem;
const storeItem = storage.storeItem;
const PUBNET = 'stellar:pubnet';
const STELLAR_METHODS = {
    SIGN: 'stellar_signXDR',
};

export default class WalletConnect extends AbstractWallet {
    public static NAME = 'walletconnect';
    public static FRIENDLY_NAME = 'WalletConnect';
    public static walletConnectExtension = 'https://walletconnect.com/';
    public walletConnectNetwork: string;

    constructor(storage: IStorage) {
        super(storage);

        this.walletConnectNetwork = PUBNET;
    }

    async initClient(): Promise<void> {
        const client = await WalletConnectClient.init({
            projectId: process.env.VITE_WALLET_CONNECT_PROJECT_ID,
            relayUrl: 'wss://relay.walletconnect.org',
            logger: 'debug',
            metadata: {
                name: 'Simple Signer Stellar #3',
                description: 'Example Dapp',
                url: 'https://localhost:3001/',
                icons: ['https://walletconnect.com/walletconnect-logo.png'],
            },
        });

        client.on(CLIENT_EVENTS.session.response, async (response: any) => {
            signedXDR.set(await response.response.result.signedXDR);
        });

        client.once(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
            const { uri } = proposal.signal.params;
            QRCodeModal.open(uri, 'Scan QR Code');
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
        storeItem('walletConnectSession', JSON.stringify(session));
    }

    public override async sign(_tx: Transaction): Promise<any> {
        const client = await WalletConnectClient.init({
            projectId: process.env.VITE_WALLET_CONNECT_PROJECT_ID,
            relayUrl: 'wss://relay.walletconnect.org',
            logger: 'debug',
            metadata: {
                name: 'Simple Signer Stellar #3',
                description: 'Example Dapp',
                url: 'https://localhost:3001/',
                icons: ['https://walletconnect.com/walletconnect-logo.png'],
            },
        });

        const sessionStorage = getItem('walletConnectSession');
        const sessionParsed = await JSON.parse(sessionStorage!);

        client.on(CLIENT_EVENTS.session.response, async (response: any) => {
            signedXDR.set(response.response.result.signedXDR);
        });

        client.request({
            topic: await sessionParsed!.topic,
            chainId: PUBNET,
            request: {
                method: 'stellar_signXDR',
                params: {
                    xdr: 'AAAAAgAAAACs3d1Ffb9O6rqEUlrxKCPte210i4eyOUvlZh/M1QUZKAAAAG4CXVArAAAABwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAABNhc2Rxd2UxMjo1MWFtIDEyLTA0AAAAAAEAAAABAAAAAKzd3UV9v07quoRSWvEoI+17bXSLh7I5S+VmH8zVBRkoAAAAAQAAAACs3d1Ffb9O6rqEUlrxKCPte210i4eyOUvlZh/M1QUZKAAAAAAAAAAAAACA6AAAAAAAAAAA',
                },
            },
        });

        return signedXDR;
    }

    public override getFriendlyName(): string {
        return WalletConnect.FRIENDLY_NAME;
    }

    public override getName(): string {
        return WalletConnect.NAME;
    }

    public override async getPublicKey(): Promise<string> {
        super.persistWallet();
        await this.initClient();

        // there is a problem with updating the states in wallet connect, a small timeout solves this problem
        await new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 500);
        });

        const sessionStorage = getItem('walletConnectSession');
        const sessionParsed = await JSON.parse(sessionStorage!);

        const publicKey = await sessionParsed.state.accounts[0]!.match(/([A-Z])\w+/);

        return publicKey![0]!;
    }

    public override getImage(): string {
        return walletConnect;
    }

    public override isInstalled(): Promise<boolean> {
        const walletConnectPromise: Promise<boolean> = new Promise((resolve) => {
            const isWalletConnectInstalled = true;
            if (isWalletConnectInstalled) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        return walletConnectPromise;
    }

    public override getExtension(): string {
        return WalletConnect.walletConnectExtension;
    }
}
