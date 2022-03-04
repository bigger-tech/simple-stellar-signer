import { getPublicKey } from '@stellar/freighter-api';
import AbstractWallet from './AbstractWallet';

export default class Freighter extends AbstractWallet {
    static async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    static logIn(publicKey: string) {
        super.connectWithWallet('freighter', publicKey);
    }
}
