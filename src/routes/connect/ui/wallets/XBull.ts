import sendMessage from '../../../../helpers/sendMessageHelpers';
import type { Transaction } from 'stellar-sdk';
import { storeItem, clearStorage } from '../../../../helpers/storage';

export default class XBull {
    async getPublicKey(): Promise<string> {
        await window.xBullSDK.connect({ canRequestPublicKey: true, canRequestSign: true });
        const publicKey = await window.xBullSDK.getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('xbull', publicKey);
        sendMessage(publicKey);
    }

    async signTx(tx: Transaction) {
        const signedXdr = await window.xBullSDK.signXDR(tx.toXDR());
        return signedXdr;
    }
}
