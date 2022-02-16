import { sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem } from '../../../../helpers/storage';
export default class Albedo {
    async getPublicKey(): Promise<string> {
        const requestPubKey = await window.albedo.publicKey({
            token: `${btoa(Math.random().toString() + Math.random().toString())}`,
        });
        const publicKey = requestPubKey.pubkey;
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        storeItem('albedo', publicKey);
        sendMessage(publicKey);
    }
}
