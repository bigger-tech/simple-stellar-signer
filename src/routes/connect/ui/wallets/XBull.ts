import { sendMessage } from '../../../../helpers/sendMessageHelpers';
import type { Transaction } from 'stellar-sdk';
import { storeItem } from '../../../../helpers/storage';

export class XBull {
    async getPublicKey(): Promise<string> {
        await window.xBullSDK.connect({
            canRequestPublicKey: true,
            canRequestSign: true,
        });
        const publicKey = await window.xBullSDK.getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        storeItem('xbull', publicKey);
        sendMessage(publicKey);
    }

    async signTx(tx: Transaction) {
        const signedXdr = await window.xBullSDK.signXDR(tx.toXDR());
        return signedXdr;
    }
}
