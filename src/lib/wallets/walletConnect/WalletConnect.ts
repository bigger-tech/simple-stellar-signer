import type { SignClient } from '@walletconnect/sign-client/dist/types/client';
import type { SessionTypes } from '@walletconnect/types';
import type { ISignClient } from '@walletconnect/types/dist/types/sign-client/client';
import type IStorage from 'src/lib/storage/IStorage';
import type { Transaction } from 'stellar-sdk';

import { WalletConnectIcon } from '../../../assets';
import { DAPP_BASE_URL, PROJECT_ID_FOR_WALLET_CONNECT } from '../../../constants';
import {
    AlreadyRunningError,
    NoPublicKeyError,
    NoSessionError,
    NotRunningError,
} from '../../errors/WalletConnectErrors';
import {
    IWalletConnetConnectionParams,
    WalletConnectAllowedMethods,
    WallletConnectService,
} from '../../service/walletConnect';
import { StellarNetwork } from '../../stellar/StellarNetwork';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

export default class WalletConnect extends AbstractWallet implements IWallet {
    private readonly PROJECT_ID = PROJECT_ID_FOR_WALLET_CONNECT;
    private readonly PROJECT_NAME = 'Simple Stellar Signer';
    private readonly PROJECT_DESCRIPTION =
        'Simple Signer provides an easy and secure way to implement log in and transaction signing functionality on your website for the Stellar network.';
    private readonly PROJECT_URL = DAPP_BASE_URL;
    private walletConnectService: WallletConnectService;
    private signClient?: ISignClient | SignClient;

    public static NAME = 'walletConnect';
    public static FRIENDLY_NAME = 'WalletConnect';
    public walletConnectNetwork = StellarNetwork.PUBLIC;

    constructor(storage: IStorage) {
        super(storage);
        this.walletConnectService = new WallletConnectService(this.PROJECT_ID);
    }

    public async start(): Promise<WalletConnect> {
        if (this.signClient) {
            throw new AlreadyRunningError();
        }

        this.signClient = await this.walletConnectService.createWalletConnectClient({
            name: this.PROJECT_NAME,
            description: this.PROJECT_DESCRIPTION,
            url: this.PROJECT_URL,
            icons: [],
        });

        return this;
    }

    private async connect(params: IWalletConnetConnectionParams): Promise<SessionTypes.Struct> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        return this.walletConnectService.connectWalletConnect(params);
    }

    private async closeSession(sessionId: string): Promise<void> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        await this.walletConnectService.disconnectWalletConnect({
            client: this.signClient,
            sessionId,
        });
    }

    private async closeSessions(): Promise<void> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        const sessions = this.signClient.session.getAll();

        if (sessions.length) {
            const closedSessionsPromises = sessions.map((session) => this.closeSession(session.topic));
            await Promise.all(closedSessionsPromises);
        }
    }

    public override async getPublicKey(): Promise<string> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        await this.closeSessions();

        const session = await this.connect({
            client: this.signClient,
            network: this.walletConnectNetwork,
            methods: [WalletConnectAllowedMethods.SIGN],
        });

        const publicKey = session.namespaces['stellar']?.accounts[0]?.split(':')[2];

        if (!publicKey) {
            throw new NoPublicKeyError();
        }

        super.persistWallet();

        return publicKey;
    }

    public override async sign(tx: Transaction): Promise<string> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        const lastKeyIndex = this.signClient.session.getAll().length - 1;
        const lastSession = this.signClient.session.getAll()[lastKeyIndex];

        if (!lastSession) {
            throw new NoSessionError();
        }

        const { signedXDR } = await this.walletConnectService.makeWalletConnectRequest({
            client: this.signClient,
            topic: lastSession.topic,
            network: this.walletConnectNetwork,
            method: WalletConnectAllowedMethods.SIGN,
            xdr: tx.toXDR(),
        });

        return signedXDR;
    }

    public override getFriendlyName(): string {
        return WalletConnect.FRIENDLY_NAME;
    }

    public override getName(): string {
        return WalletConnect.NAME;
    }

    public override getSvgIcon(): typeof WalletConnectIcon {
        return WalletConnectIcon;
    }

    public override isInstalled(): Promise<boolean> {
        return new Promise((resolve) => {
            resolve(true);
        });
    }
}
