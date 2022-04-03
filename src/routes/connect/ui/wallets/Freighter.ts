import AbstractWallet from './AbstractWallet';
import { getPublicKey, signTransaction } from '@stellar/freighter-api';
import type { Transaction } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';
import { StellarNetwork } from '../../../../helpers/StellarNetwork';

export default class Freighter extends AbstractWallet implements IWallet {
    public static NAME = 'freighter';
    public freighterNetwork: any;

    constructor() {
        super();

        const stellarNetwork = process.env.VITE_STELLAR_NETWORK;
        if (stellarNetwork === StellarNetwork.PUBLIC) {
            this.freighterNetwork = StellarNetwork.PUBLIC.toUpperCase();
        } else {
            this.freighterNetwork = StellarNetwork.TESTNET.toUpperCase();
        }
    }

    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    logIn(publicKey: string) {
        super.connectWithWallet(Freighter.NAME, publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await signTransaction(tx.toXDR(), this.freighterNetwork);
        return signedXdr;
    }
}
