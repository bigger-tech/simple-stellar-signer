import { getPublicKey, signTransaction } from '@stellar/freighter-api';
import sendMessage from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
import type { Transaction } from 'stellar-sdk';

export default class Freighter {
    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('freighter', publicKey);
        sendMessage(publicKey);
    }

    async signTx(tx: Transaction) {
        const signedXdr = await signTransaction(tx.toXDR(), 'TESTNET');
        return signedXdr;
    }
}
