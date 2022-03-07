import sendMessage from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
import type { Transaction } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';

export default class Rabet implements IWallet {
    public static NAME = 'rabet';
    public rabetNetwork: string;

    constructor() {
        const stellarNetwork = import.meta.env.VITE_STELLAR_NETWORK;

        if (stellarNetwork === 'PUBLIC') {
            this.rabetNetwork = 'mainnet';
        } else {
            this.rabetNetwork = 'testnet';
        }
    }

    async getPublicKey(): Promise<string> {
        const publicKey = await window.rabet.connect().then((result) => {
            const data = result.publicKey;
            return data;
        });
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('wallet', 'rabet');
        sendMessage(publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await window.rabet.sign(tx.toXDR(), this.rabetNetwork).then((result) => {
            const xdr = result.xdr;
            return xdr;
        });
        return signedXdr;
    }
}
