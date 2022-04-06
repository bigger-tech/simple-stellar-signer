import type { Transaction } from 'stellar-sdk';

import { albedo } from '../../../assets';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import type IStorage from '../../storage/IStorage';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

export default class Albedo extends AbstractWallet implements IWallet {
    public static NAME = 'albedo';
    public static FRIENDLY_NAME = 'Albedo';
    public albedoNetwork: string;

    constructor(storage: IStorage) {
        super(storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.albedoNetwork = StellarNetwork.PUBLIC;
        } else {
            this.albedoNetwork = StellarNetwork.TESTNET;
        }
    }

    public override async getPublicKey(): Promise<string> {
        const requestPubKey = await window.albedo.publicKey({
            token: `${btoa(Math.random().toString() + Math.random().toString())}`,
        });
        super.persistWallet();
        return requestPubKey.pubkey;
    }

    public override async sign(tx: Transaction) {
        const signedXdr = await window.albedo.tx({ xdr: tx.toXDR(), network: this.albedoNetwork });
        return signedXdr.signed_envelope_xdr;
    }

    public override getFriendlyName(): string {
        return Albedo.FRIENDLY_NAME;
    }

    public override getName(): string {
        return Albedo.NAME;
    }

    public override getImage(): string {
        return albedo;
    }
}
