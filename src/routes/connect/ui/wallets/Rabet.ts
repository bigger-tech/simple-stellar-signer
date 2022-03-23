import type { Transaction } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';
import { StellarNetwork } from '../../../../helpers/StellarNetwork';
import { rabet } from '../../../../assets/index';
import AbstractWallet from './AbstractWallet';

export default class Rabet extends AbstractWallet implements IWallet {
    public static NAME = 'rabet';
    public rabetNetwork: string;
    public mainNetwork = 'mainnet';

    constructor() {
        super();

        const stellarNetwork = import.meta.env.VITE_STELLAR_NETWORK;
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

    getConnectObject() {
        return {
            name: 'Rabet',
            connectMethod: async () => {
                this.logIn(await this.getPublicKey());
            },
            img: rabet,
            width: 35,
            height: 45,
        }; // this has to be an interface
    }

    async sign(tx: Transaction) {
        const signedXdr = await window.rabet.sign(tx.toXDR(), this.rabetNetwork).then((result) => {
            const xdr = result.xdr;
            return xdr;
        });
        return signedXdr;
    }
}
