import type ISimpleSignerEvent from './ISimpleSignerEvent';
import EventFactory from './EventFactory';

export default class Bridge {
    public sendSignedTx(signedXDR: string) {
        this.sendMessage(EventFactory.createOnSignEvent(signedXDR));
        this.closeWindow();
    }

    public sendOnReadyEvent() {
        this.sendMessage(EventFactory.createOnReadyEvent());
    }

    public sendOnConnectEvent(publicKey: string, wallet: string): void {
        this.sendMessage(EventFactory.createOnConnectEvent(publicKey, wallet));
        this.closeWindow();
    }

    private closeWindow() {
        return window.close();
    }

    private sendMessage(message: ISimpleSignerEvent): void {
        if (window.opener) {
            window.opener.postMessage(message, '*');
        }
    }
}
