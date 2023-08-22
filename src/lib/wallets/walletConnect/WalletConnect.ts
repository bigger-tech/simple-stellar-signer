import type { ISignClient } from '@walletconnect/types/dist/types/sign-client/client';
import type IStorage from 'src/lib/storage/IStorage';

import { WalletConnectIcon } from '../../../assets';
import { AlreadyRunningError, NoPublicKeyError, NotRunningError } from '../../errors/WalletConnectErrors';
import {
    IParsedWalletConnectSession,
    IWalletConnetConnectionParams,
    WalletConnectAllowedMethods,
    WallletConnectService,
} from '../../service/walletConnect';
import { StellarNetwork } from '../../stellar/StellarNetwork';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

export default class WalletConnect extends AbstractWallet implements IWallet {
    private readonly PROJECT_ID = import.meta.env.VITE_PROJECT_ID_FOR_WALLET_CONNECT;
    private readonly PROJECT_NAME = 'Simple Stellar Signer';
    private readonly PROJECT_DESCRIPTION =
        'Simple Signer provides an easy and secure way to implement log in and transaction signing functionality on your website for the Stellar network.';
    private readonly PROJECT_URL = import.meta.env.VITE_DAPP_BASE_URL;
    private walletConnectService: WallletConnectService;
    private signClient?: ISignClient;
    private activeSession: string | null = null;

    public static NAME = 'walletConnect';
    public static FRIENDLY_NAME = 'WalletConnect';

    public walletConnectNetwork = StellarNetwork.PUBLIC;

    constructor(storage: IStorage) {
        super(storage);
        this.walletConnectService = new WallletConnectService(this.PROJECT_ID);
    }

    private setSession(sessionId: string | null) {
        this.activeSession = sessionId;
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

    private async connect(params: IWalletConnetConnectionParams): Promise<IParsedWalletConnectSession> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        const session = await this.walletConnectService.connectWalletConnect(params);
        const parseSession = this.walletConnectService.parseWalletConnectSession(session);

        this.setSession(parseSession.id);

        return parseSession;
    }

    private async getSessions(): Promise<IParsedWalletConnectSession[]> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        return this.signClient.session.values.map(this.walletConnectService.parseWalletConnectSession);
    }

    public override async getPublicKey(): Promise<string> {
        if (!this.signClient) {
            throw new NotRunningError();
        }

        let publicKey: string | undefined;

        if (this.activeSession) {
            const activeSessions = await this.getSessions();

            const targetSession = activeSessions.find((session) => session.id === this.activeSession);

            if (!targetSession) {
                this.setSession(null);
            } else {
                publicKey = targetSession.accounts[0]?.publicKey;
            }
        }

        if (!this.activeSession) {
            const session = await this.connect({
                client: this.signClient,
                network: this.walletConnectNetwork,
                methods: [WalletConnectAllowedMethods.SIGN],
            });

            this.setSession(session.id);

            publicKey = session.accounts[0]?.publicKey;
        }

        if (!publicKey) {
            throw new NoPublicKeyError();
        }

        return publicKey;
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
