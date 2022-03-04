import type { Transaction } from 'stellar-sdk';
import AbstractWallet from './AbstractWallet';

export default class XBull extends AbstractWallet {
    static async getPublicKey(): Promise<string> {
        await window.xBullSDK.connect({ canRequestPublicKey: true, canRequestSign: true });
        const publicKey = await window.xBullSDK.getPublicKey();
        return publicKey;
    }

    static logIn(publicKey: string) {
        super.connectWithWallet('xbull', publicKey);
    }

    static async signTx(tx: Transaction) {
        const signedXdr = await window.xBullSDK.signXDR(tx.toXDR());
        return signedXdr;
    }
}
