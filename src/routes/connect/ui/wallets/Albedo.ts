import type { IConnectedEvent } from 'src/helpers/eventInterfaces/IConnectedEvent';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
let connectedEvent: IConnectedEvent;

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
        connectedEvent = {
            type: 'connected',
            message: {
                publicKey,
                wallet: 'albedo',
            },
        };
        clearStorage();
        storeItem('albedo', publicKey);
        sendMessage(connectedEvent);
        closeWindow();
    }
}
