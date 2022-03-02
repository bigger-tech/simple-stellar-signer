import type { Transaction, Keypair } from 'stellar-sdk';
import { encryptPrivateKey, getStellarKeypair } from '../../connectHelpers';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import EventsClass from '../../../../helpers/EventsClass';

export default class PrivateKey {
    async getPublicKey(keyPair: Keypair): Promise<string> {
        const publicKey = keyPair.publicKey();
        return publicKey;
    }

    async logIn(privateKey: string): Promise<void> {
        try {
            const stellarKeyPair = await getStellarKeypair(privateKey);
            const publicKey = await this.getPublicKey(stellarKeyPair);
            const connectEvent = new EventsClass().onConnectEvent(publicKey, 'privateKey');
            encryptPrivateKey(privateKey);
            sendMessage(connectEvent);
            closeWindow();
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                console.log('Invalid key, please try again');
            }
        }
    }

    signTx(tx: Transaction, secretKey: Keypair): string {
        tx.sign(secretKey);
        const signedXDR = tx.toXDR();
        return signedXDR;
    }
}
