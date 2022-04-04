import type { Transaction } from 'stellar-sdk';
import type IWallet from '../IWallet';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import AbstractWallet from '../AbstractWallet';
import type Bridge from '../../bridge/Bridge';
import type IStorage from '../../storage/IStorage';

export default class Albedo extends AbstractWallet implements IWallet {
    public static NAME = 'albedo';
    public albedoNetwork: string;

    constructor(bridge: Bridge, storage: IStorage) {
        super(bridge, storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.albedoNetwork = StellarNetwork.PUBLIC;
        } else {
            this.albedoNetwork = StellarNetwork.TESTNET;
        }
    }

    async getPublicKey(): Promise<string> {
        const requestPubKey = await window.albedo.publicKey({
            token: `${btoa(Math.random().toString() + Math.random().toString())}`,
        });
        return requestPubKey.pubkey;
    }

    logIn(publicKey: string) {
        super.connectWithWallet(Albedo.NAME, publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await window.albedo.tx({ xdr: tx.toXDR(), network: this.albedoNetwork });
        return signedXdr.signed_envelope_xdr;
    }
}
