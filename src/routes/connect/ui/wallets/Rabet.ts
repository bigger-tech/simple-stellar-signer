import sendMessage from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
import type { Transaction } from 'stellar-sdk';

export default class Rabet {
    async getPublicKey(): Promise<string> {
        const publicKey = await window.rabet.connect().then((result) => {
            const data = result.publicKey;
            console.log(data);

            return data;
        });
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('rabet', publicKey);
        sendMessage(publicKey);
    }

    async signTx(tx: Transaction) {
        const signedXdr = await window.rabet.sign(tx.toXDR(), 'testnet').then((result) => {
            const xdr = result.xdr;
            return xdr;
        });
        return signedXdr;
    }
}
