import { encryptPrivateKey, getStellarKeypair } from '../../connectHelpers';
import sendMessage from '../../../../helpers/sendMessageHelpers';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import type { Transaction, Keypair } from 'stellar-sdk';

export default class PrivateKey {
    async getPublicKey(keyPair: Keypair): Promise<string> {
        const publicKey = keyPair.publicKey();
        return publicKey;
    }

    async logIn(privateKey: string): Promise<void> {
        try {
            const stellarKeyPair = await getStellarKeypair(privateKey);
            const publicKey = await this.getPublicKey(stellarKeyPair);
            encryptPrivateKey(privateKey);
            sendMessage(publicKey);
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                sendMessage('Invalid key, please try again');
            }
        }
    }

    async signTx(tx: Transaction, secretKey: Keypair): Promise<string> {
        tx.sign(secretKey);
        const signedXDR = tx.toXDR();
        return signedXDR;
    }
}
