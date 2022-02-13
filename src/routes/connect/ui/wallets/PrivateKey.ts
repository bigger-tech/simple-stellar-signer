import { encryptPrivateKey, getStellarKeypair } from '../../connectHelpers';
import { sendMessage } from '../../../../helpers/sendMessageHelpers';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import type { Transaction, Keypair } from 'stellar-sdk';

export class PrivateKey {
    async getPublicKey(privateKey: string) {
        const stellarKeyPair = await getStellarKeypair(privateKey);
        const publicKey = stellarKeyPair.publicKey();
        return publicKey;
    }

    async logIn(privateKey: string) {
        try {
            const publicKey = await this.getPublicKey(privateKey);
            encryptPrivateKey(privateKey);
            sendMessage(publicKey);
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                sendMessage('Invalid key, please try again');
            }
        }
    }

    signTx(tx: Transaction, secretKey: Keypair) {
        const signTx = tx.sign(secretKey);
        const txSigned = tx.toXDR();
        sendMessage(txSigned);
        return signTx;
    }
}
