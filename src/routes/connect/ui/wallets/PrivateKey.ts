import { decryptPrivatePair, encryptPrivateKey } from '../../connectHelpers';
import sendMessage from '../../../../helpers/sendMessageHelpers';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import type { Transaction } from 'stellar-sdk';
import { Keypair } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';

export default class PrivateKey implements IWallet {
    privateKey: string;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
    }

    async getPublicKey(keyPair: Keypair): Promise<string> {
        const publicKey = keyPair.publicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        try {
            const stellarKeyPair = Keypair.fromSecret(this.privateKey);
            const publicKey = await this.getPublicKey(stellarKeyPair);
            encryptPrivateKey(this.privateKey);
            sendMessage(publicKey);
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                sendMessage('Invalid key, please try again');
            }
        }
    }

    async sign(tx: Transaction): Promise<string> {
        const privateKey = await decryptPrivatePair();
        const keyPair = Keypair.fromSecret(privateKey);
        tx.sign(keyPair);
        const signedXDR = tx.toXDR();
        return signedXDR;
    }
}
