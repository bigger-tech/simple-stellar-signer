import { decryptPrivatePair, encryptPrivateKey } from '../../connectHelpers';
import sendMessage from '../../../../helpers/sendMessageHelpers';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import type { Transaction } from 'stellar-sdk';
import { Keypair } from 'stellar-sdk';
import type IWallet from './interfaces/IWallet';
import { clearStorage, storeItem } from '../../../../helpers/storage';

export default class PrivateKey implements IWallet {
    public static NAME = 'privateKey';

    async getPublicKey(keyPair: Keypair): Promise<string> {
        const publicKey = keyPair.publicKey();
        return publicKey;
    }

    async logIn(privateKey: string): Promise<void> {
        try {
            const stellarKeyPair = Keypair.fromSecret(privateKey);
            const publicKey = await this.getPublicKey(stellarKeyPair);
            clearStorage();
            storeItem('wallet', PrivateKey.NAME);
            encryptPrivateKey(privateKey);
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
