import type { Transaction } from 'stellar-sdk';

import { rabet } from '../../../assets';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import type IStorage from '../../storage/IStorage';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

type RabetNetwork = 'mainnet' | 'testnet';
export default class Rabet extends AbstractWallet implements IWallet {
    public static NAME = 'rabet';
    public static FRIENDLY_NAME = 'Rabet';
    public rabetNetwork: RabetNetwork;
    public mainNetwork: RabetNetwork = 'mainnet';

    constructor(storage: IStorage) {
        super(storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.rabetNetwork = this.mainNetwork;
        } else {
            this.rabetNetwork = StellarNetwork.TESTNET as RabetNetwork;
        }
    }

    public override async getPublicKey(): Promise<string> {
        const result = await window.rabet.connect();
        super.persistWallet();
        return result.publicKey;
    }

    public override async sign(tx: Transaction): Promise<string> {
        return window.rabet.sign(tx.toXDR(), this.rabetNetwork).then((result) => result.xdr);
    }

    public override getFriendlyName(): string {
        return Rabet.FRIENDLY_NAME;
    }

    public override getName(): string {
        return Rabet.NAME;
    }

    public override getImage(): string {
        return rabet;
    }
}
