import { getPublicKey, signTransaction } from '@stellar/freighter-api';
import sendMessage from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
import type { Transaction } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';

export default class Freighter implements IWallet {
    public static NAME = 'freighter';
    public freighterNetwork: any;
    public publicNetwork = 'PUBLIC';
    public testnetNetwork = 'TESTNET';

    constructor() {
        const stellarNetwork = import.meta.env.VITE_STELLAR_NETWORK;

        if (stellarNetwork === this.publicNetwork) {
            this.freighterNetwork = this.publicNetwork;
        } else {
            this.freighterNetwork = this.testnetNetwork;
        }
    }

    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('wallet', Freighter.NAME);
        sendMessage(publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await signTransaction(tx.toXDR(), this.freighterNetwork);
        return signedXdr;
    }
}
