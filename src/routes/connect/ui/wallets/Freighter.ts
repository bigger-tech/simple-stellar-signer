import EventsClass from '../../../../helpers/EventsClass';
import { getPublicKey } from '@stellar/freighter-api';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';

export default class Freighter {
    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        const connectEvent = new EventsClass().onConnectEvent(publicKey, 'freighter');
        clearStorage();
        storeItem('freighter', publicKey);
        sendMessage(connectEvent);
        closeWindow();
    }
}
