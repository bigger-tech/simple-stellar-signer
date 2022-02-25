import type { IConnectedEvent } from 'src/helpers/eventInterfaces/IConnectedEvent';
import { getPublicKey } from '@stellar/freighter-api';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
let connectedEvent: IConnectedEvent;

export default class Freighter {
    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        connectedEvent = {
            type: 'connected',
            message: {
                publicKey,
                wallet: 'freighter',
            },
        };
        clearStorage();
        storeItem('freighter', publicKey);
        sendMessage(connectedEvent);
        closeWindow();
    }
}
