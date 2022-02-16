import { encryptPrivateKey, getStellarKeypair } from '../../connectHelpers';
import { sendMessage } from '../../../../helpers/sendMessageHelpers';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import type { Transaction, Keypair } from 'stellar-sdk';

export default class PrivateKey {
    async getPublicKey(privateKey: string): Promise<string> {
        const stellarKeyPair = await getStellarKeypair(privateKey);
        const publicKey = stellarKeyPair.publicKey();
        return publicKey;
    }

    async logIn(privateKey: string): Promise<void> {
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

    signTx(tx: Transaction, secretKey: Keypair): string {
        tx.sign(secretKey);
        const signedXDR = tx.toXDR();
        sendMessage(signedXDR);
        return signedXDR;
    }
}
