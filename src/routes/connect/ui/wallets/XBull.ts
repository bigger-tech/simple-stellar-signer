import sendMessage from '../../../../helpers/sendMessageHelpers';
import type { Transaction } from 'stellar-sdk';
import { storeItem, clearStorage } from '../../../../helpers/storage';
import type IWallet from './interfaces/IWallet';

export default class XBull implements IWallet {
    public static NAME = 'xbull';
    public XBullNetwork: string;

    constructor() {
        const stellarNetwork = import.meta.env.VITE_STELLAR_NETWORK;

        if (stellarNetwork === 'PUBLIC') {
            this.XBullNetwork = 'public';
        } else {
            this.XBullNetwork = 'testnet';
        }
    }

    async getPublicKey(): Promise<string> {
        await window.xBullSDK.connect({ canRequestPublicKey: true, canRequestSign: true });
        const publicKey = await window.xBullSDK.getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('wallet', 'xbull');
        sendMessage(publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await window.xBullSDK.signXDR(tx.toXDR(), { network: this.XBullNetwork });
        return signedXdr;
    }
}
