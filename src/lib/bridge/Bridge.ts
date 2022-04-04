import type ISimpleSignerEvent from './ISimpleSignerEvent';
import type IAvailableWalletsMessage from './availableWalletsMessage/IAvailableWalletsMessage';
import type { ITransactionMessage } from './transactionMessage/ITransactionMessage';
export type IAvailableWalletsMessageHandler = (message: IAvailableWalletsMessage) => void;
export type ITransactionMessageHandler = (message: ITransactionMessage) => void;
import InvalidMessageError from './InvalidMessageError';
import EventFactory from './EventFactory';

export default class Bridge {
    constructor() {
        window.addEventListener('message', this.messageHandler);
    }
    private availableWalletsMessageHandlers: IAvailableWalletsMessageHandler[] = [];
    private transactionMessageHandlers: ITransactionMessageHandler[] = [];

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

    public addAvailableWalletsMessageHandler(handler: IAvailableWalletsMessageHandler) {
        this.availableWalletsMessageHandlers.push(handler);
    }
    public addTransactionMessageHandler(handler: ITransactionMessageHandler) {
        this.transactionMessageHandlers.push(handler);
    }

    public getTransactionMessageFromUrl(queryString?: string): ITransactionMessage | null {
        const urlParams = new URLSearchParams(queryString || window.location.search);
        const xdrParam = urlParams.get('xdr');
        const descriptionParam = urlParams.get('description');
        let urlXdr: string;

        if (xdrParam && descriptionParam) {
            urlXdr = xdrParam.replace(/\s/g, '+');
            return { xdr: urlXdr, description: descriptionParam, operationGroups: [] };
        } else if (xdrParam) {
            urlXdr = xdrParam.replace(/\s/g, '+');
            return { xdr: urlXdr, description: undefined, operationGroups: [] };
        } else {
            return null;
        }
    }

    public getWalletsFromUrl(): string[] {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.getAll('wallets');
    }

    private messageHandler(e: MessageEvent): void {
        if ('wallets' in e.data) {
            const message = e.data as IAvailableWalletsMessage;
            this.availableWalletsMessageHandlers.forEach((handler) => handler(message));
            return;
        }

        if ('xdr' in e.data) {
            const message = e.data as ITransactionMessage;
            this.transactionMessageHandlers.forEach((handler) => handler(message));
            return;
        }

        throw new InvalidMessageError();
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
