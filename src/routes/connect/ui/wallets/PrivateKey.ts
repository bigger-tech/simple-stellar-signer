import type { Transaction } from 'stellar-sdk';
import { Keypair } from 'stellar-sdk';
import { encryptPrivateKey, decryptPrivatePair } from '../../connectHelpers';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import AbstractWallet from './AbstractWallet';

export default class PrivateKey extends AbstractWallet {
    static async getPublicKey(): Promise<string> {
        const privateKey = await decryptPrivatePair();
        const publicKey = Keypair.fromSecret(privateKey).publicKey();
        return publicKey;
    }

    static async logIn(privateKey: string): Promise<void> {
        try {
            const publicKey = Keypair.fromSecret(privateKey).publicKey();
            encryptPrivateKey(privateKey);
            super.connectWithWallet('privateKey', publicKey);
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                console.log('Invalid key, please try again');
            }
        }
    }

    static async signTx(tx: Transaction): Promise<string> {
        const privateKey = await decryptPrivatePair();
        const keyPair = Keypair.fromSecret(privateKey);
        tx.sign(keyPair);
        const signedXDR = tx.toXDR();
        return signedXDR;
    }
}
