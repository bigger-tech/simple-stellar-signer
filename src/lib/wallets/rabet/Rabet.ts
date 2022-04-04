import type { Transaction } from 'stellar-sdk';
import type IWallet from '../IWallet';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import AbstractWallet from '../AbstractWallet';
import type Bridge from '../../bridge/Bridge';
import type IStorage from '../../storage/IStorage';

type RabetNetwork = 'mainnet' | 'testnet';
export default class Rabet extends AbstractWallet implements IWallet {
    public static NAME = 'rabet';
    public rabetNetwork: RabetNetwork;
    public mainNetwork: RabetNetwork = 'mainnet';

    constructor(bridge: Bridge, storage: IStorage) {
        super(bridge, storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.rabetNetwork = this.mainNetwork;
        } else {
            this.rabetNetwork = StellarNetwork.TESTNET as RabetNetwork;
        }
    }

    async getPublicKey(): Promise<string> {
        return window.rabet.connect().then((result) => result.publicKey);
    }

    async logIn(publicKey: string): Promise<void> {
        super.connectWithWallet(Rabet.NAME, publicKey);
    }

    async sign(tx: Transaction) {
        return window.rabet.sign(tx.toXDR(), this.rabetNetwork).then((result) => result.xdr);
    }
}
