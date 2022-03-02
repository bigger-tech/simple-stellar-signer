import type { IOnConnectEvent } from 'src/helpers/eventInterfaces/IOnConnectEvent';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';
let connectEvent: IOnConnectEvent;

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
        connectEvent = {
            type: 'connected',
            message: {
                publicKey,
                wallet: 'albedo',
            },
        };
        clearStorage();
        storeItem('albedo', publicKey);
        sendMessage(connectEvent);
        closeWindow();
    }
}
