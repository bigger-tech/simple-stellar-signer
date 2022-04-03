import type { Transaction } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';
import { StellarNetwork } from '../../../../helpers/StellarNetwork';
import AbstractWallet from './AbstractWallet';

export default class Rabet extends AbstractWallet implements IWallet {
    public static NAME = 'rabet';
    public rabetNetwork: string;
    public mainNetwork = 'mainnet';

    constructor() {
        super();

        const stellarNetwork = process.env.VITE_STELLAR_NETWORK;
        if (stellarNetwork === StellarNetwork.PUBLIC) {
            this.rabetNetwork = this.mainNetwork;
        } else {
            this.rabetNetwork = StellarNetwork.TESTNET;
        }
    }

    async getPublicKey(): Promise<string> {
        const publicKey = await window.rabet.connect().then((result) => {
            const data = result.publicKey;
            return data;
        });
        return publicKey;
    }

    async logIn(publicKey: string): Promise<void> {
        super.connectWithWallet(Rabet.NAME, publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await window.rabet.sign(tx.toXDR(), this.rabetNetwork).then((result) => {
            const xdr = result.xdr;
            return xdr;
        });
        return signedXdr;
    }
}
