import { getPublicKey } from '@stellar/freighter-api';
import { sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem } from '../../../../helpers/storage';
export default class Freighter {
    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        storeItem('freighter', publicKey);
        sendMessage(publicKey);
    }
}
