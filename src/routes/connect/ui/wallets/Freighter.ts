import type { IOnConnectEvent } from 'src/helpers/eventInterfaces/IOnConnectEvent';
import { getPublicKey } from '@stellar/freighter-api';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
let connectEvent: IOnConnectEvent;

export default class Freighter {
    async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        connectEvent = {
            type: 'connected',
            message: {
                publicKey,
                wallet: 'freighter',
            },
        };
        clearStorage();
        storeItem('freighter', publicKey);
        sendMessage(connectEvent);
        closeWindow();
    }
}
