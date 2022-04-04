import type { Transaction } from 'stellar-sdk';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import type Bridge from '../../bridge/Bridge';
import type IStorage from '../../storage/IStorage';

type XBullNetwork = 'public' | 'testnet';
export default class XBull extends AbstractWallet implements IWallet {
    public static NAME = 'xbull';
    public XBullNetwork: XBullNetwork;

    constructor(bridge: Bridge, storage: IStorage) {
        super(bridge, storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.XBullNetwork = StellarNetwork.PUBLIC as XBullNetwork;
        } else {
            this.XBullNetwork = StellarNetwork.TESTNET as XBullNetwork;
        }
    }

    async getPublicKey(): Promise<string> {
        await window.xBullSDK.connect({ canRequestPublicKey: true, canRequestSign: true });
        return window.xBullSDK.getPublicKey();
    }

    logIn(publicKey: string) {
        super.connectWithWallet(XBull.NAME, publicKey);
    }

    async sign(tx: Transaction) {
        return window.xBullSDK.signXDR(tx.toXDR(), { network: this.XBullNetwork });
    }
}
