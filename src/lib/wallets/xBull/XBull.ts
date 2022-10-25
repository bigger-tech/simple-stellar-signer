import { xBullWalletConnect } from '@creit-tech/xbull-wallet-connect';
import type { Transaction } from 'stellar-sdk';

import { xBull } from '../../../assets';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import type IStorage from '../../storage/IStorage';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

type XBullNetwork = 'public' | 'testnet';
export default class XBull extends AbstractWallet implements IWallet {
    public static NAME = 'xbull';
    public static FRIENDLY_NAME = 'xBull';
    public static XBullExtension = 'https://wallet.xbull.app';
    public xBullBridge: xBullWalletConnect;
    public XBullNetwork: XBullNetwork;

    constructor(storage: IStorage) {
        super(storage);
        this.xBullBridge = new xBullWalletConnect();
        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.XBullNetwork = StellarNetwork.PUBLIC as XBullNetwork;
        } else {
            this.XBullNetwork = StellarNetwork.TESTNET as XBullNetwork;
        }
    }

    public override async getPublicKey(): Promise<string> {
        const publicKey = await this.xBullBridge.connect();
        this.xBullBridge.closeConnections();
        super.persistWallet();
        return publicKey;
    }

    public override async sign(tx: Transaction): Promise<string> {
        const signedXdr = await this.xBullBridge.sign({ xdr: tx.toXDR() });
        this.xBullBridge.closeConnections();
        return signedXdr;
    }

    public override getFriendlyName(): string {
        return XBull.FRIENDLY_NAME;
    }

    public override getName(): string {
        return XBull.NAME;
    }

    public override getImage(): string {
        return xBull;
    }

    public override getExtension(): string {
        return XBull.XBullExtension;
    }

    public override isInstalled(): Promise<boolean> {
        const xBullPromise: Promise<boolean> = new Promise((resolve) => {
            resolve(true);
        });
        return xBullPromise;
    }
}
