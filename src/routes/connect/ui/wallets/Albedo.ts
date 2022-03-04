import AbstractWallet from './AbstractWallet';

export default class Albedo extends AbstractWallet {
    static async getPublicKey(): Promise<string> {
        const requestPubKey = await window.albedo.publicKey({
            token: `${btoa(Math.random().toString() + Math.random().toString())}`,
        });
        const publicKey = requestPubKey.pubkey;
        return publicKey;
    }

    static logIn(publicKey: string) {
        super.connectWithWallet('albedo', publicKey);
    }
}
