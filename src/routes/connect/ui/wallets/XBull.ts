import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import type { Transaction } from 'stellar-sdk';
import { storeItem, clearStorage } from '../../../../helpers/storage';
import type { IConnectedEvent } from 'src/helpers/eventInterfaces/IConnectedEvent';

export default class XBull {
    async getPublicKey(): Promise<string> {
        await window.xBullSDK.connect({ canRequestPublicKey: true, canRequestSign: true });
        const publicKey = await window.xBullSDK.getPublicKey();
        return publicKey;
    }

    async logIn(): Promise<void> {
        const publicKey = await this.getPublicKey();
        clearStorage();
        storeItem('xbull', publicKey);

        const connectedEvent: IConnectedEvent = {
            type: 'connected',
            message: {
                publicKey,
                wallet: 'xBull',
            },
        };
        sendMessage(connectedEvent);
        closeWindow();
    }

    async signTx(tx: Transaction) {
        const signedXdr = await window.xBullSDK.signXDR(tx.toXDR());
        return signedXdr;
    }
}
