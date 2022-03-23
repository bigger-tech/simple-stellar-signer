import type IWallet from './interfaces/IWallet';
import type { Transaction } from 'stellar-sdk';
import { decryptPrivatePair, encryptPrivateKey } from '../../connectHelpers';
import { Keypair } from 'stellar-sdk';
import AbstractWallet from './AbstractWallet';
import InvalidPrivateKeyError from '../../errors/InvalidPrivateKeyError';
import { privateKey } from '../../../../assets/index';
import { isWalletHidden } from '../../connectStore';

export default class PrivateKey extends AbstractWallet implements IWallet {
    public static NAME = 'privateKey';

    async getPublicKey(): Promise<string> {
        const privateKey = await decryptPrivatePair();
        const publicKey = Keypair.fromSecret(privateKey).publicKey();
        return publicKey;
    }

    async logIn(privateKey: string): Promise<void> {
        try {
            const publicKey = Keypair.fromSecret(privateKey).publicKey();
            encryptPrivateKey(privateKey);
            super.connectWithWallet(PrivateKey.NAME, publicKey);
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                console.log('Invalid key, please try again');
            }
        }
    }

    getConnectObject() {
        return {
            name: 'Private Key',
            connectMethod: async () => {
                isWalletHidden.set(true);
            },
            img: privateKey,
            width: 45,
            height: 45,
        }; // this has to be an interface
    }

    async sign(tx: Transaction): Promise<string> {
        const privateKey = await decryptPrivatePair();
        const keyPair = Keypair.fromSecret(privateKey);
        tx.sign(keyPair);
        const signedXDR = tx.toXDR();
        return signedXDR;
    }
}
