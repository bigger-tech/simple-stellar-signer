import AbstractWallet from '../AbstractWallet';
import { getPublicKey, signTransaction } from '@stellar/freighter-api';
import type { Transaction } from 'stellar-sdk';
import type IWallet from '../IWallet';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import type Bridge from '../../bridge/Bridge';
import type IStorage from '../../storage/IStorage';

type FreighterNetwork = 'PUBLIC' | 'TESTNET';

export default class Freighter extends AbstractWallet implements IWallet {
    public static NAME = 'freighter';
    public freighterNetwork: FreighterNetwork;

    constructor(bridge: Bridge, storage: IStorage) {
        super(bridge, storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.freighterNetwork = StellarNetwork.PUBLIC.toUpperCase() as FreighterNetwork;
        } else {
            this.freighterNetwork = StellarNetwork.TESTNET.toUpperCase() as FreighterNetwork;
        }
    }

    async getPublicKey(): Promise<string> {
        return getPublicKey();
    }

    logIn(publicKey: string) {
        super.connectWithWallet(Freighter.NAME, publicKey);
    }

    async sign(tx: Transaction) {
        return signTransaction(tx.toXDR(), this.freighterNetwork);
    }
}
