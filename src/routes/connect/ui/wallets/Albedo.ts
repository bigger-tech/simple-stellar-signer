import type { Transaction } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';
import { StellarNetwork } from '../../../../helpers/StellarNetwork';
import AbstractWallet from './AbstractWallet';
export default class Albedo extends AbstractWallet implements IWallet {
    public static NAME = 'albedo';
    public albedoNetwork: string;

    constructor() {
        super();

        const stellarNetwork = import.meta.env.VITE_STELLAR_NETWORK;
        if (stellarNetwork === StellarNetwork.PUBLIC) {
            this.albedoNetwork = StellarNetwork.PUBLIC;
        } else {
            this.albedoNetwork = StellarNetwork.TESTNET;
        }
    }

    async getPublicKey(): Promise<string> {
        const requestPubKey = await window.albedo.publicKey({
            token: `${btoa(Math.random().toString() + Math.random().toString())}`,
        });
        const publicKey = requestPubKey.pubkey;
        return publicKey;
    }

    logIn(publicKey: string) {
        super.connectWithWallet(Albedo.NAME, publicKey);
    }

    async sign(tx: Transaction) {
        const signedXdr = await window.albedo.tx({ xdr: tx.toXDR(), network: this.albedoNetwork });
        return signedXdr.signed_envelope_xdr;
    }
}
