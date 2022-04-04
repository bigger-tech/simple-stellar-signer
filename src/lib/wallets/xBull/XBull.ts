import type { Transaction } from 'stellar-sdk';

import { xBull } from '../../../assets';
import type Bridge from '../../bridge/Bridge';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import type IStorage from '../../storage/IStorage';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

type XBullNetwork = 'public' | 'testnet';
export default class XBull extends AbstractWallet implements IWallet {
    public static NAME = 'xbull';
    public static FRIENDLY_NAME = 'xBull';
    public XBullNetwork: XBullNetwork;

    constructor(bridge: Bridge, storage: IStorage) {
        super(bridge, storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.XBullNetwork = StellarNetwork.PUBLIC as XBullNetwork;
        } else {
            this.XBullNetwork = StellarNetwork.TESTNET as XBullNetwork;
        }
    }

    public override async getPublicKey(): Promise<string> {
        await window.xBullSDK.connect({ canRequestPublicKey: true, canRequestSign: true });
        super.persistWallet();
        return window.xBullSDK.getPublicKey();
    }

    public override async sign(tx: Transaction): Promise<string> {
        return window.xBullSDK.signXDR(tx.toXDR(), { network: this.XBullNetwork });
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
}
