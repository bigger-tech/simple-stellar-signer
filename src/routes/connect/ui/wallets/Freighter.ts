import { getPublicKey, signTransaction } from '@stellar/freighter-api';
import sendMessage from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
import type { Transaction } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';

export default class Freighter implements IWallet {
    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('wallet', 'freighter');
        sendMessage(publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await signTransaction(tx.toXDR(), 'TESTNET');
        return signedXdr;
    }
}
