import EventFactory from './EventFactory';
import type ISimpleSignerEvent from './ISimpleSignerEvent';
import type IAvailableWalletsMessage from './availableWalletsMessage/IAvailableWalletsMessage';
import type { IPaymentMessage } from './paymentMessage/IPaymentMessage';
import type { ITransactionMessage } from './transactionMessage/ITransactionMessage';

export type IAvailableWalletsMessageHandler = (message: IAvailableWalletsMessage) => void;
export type ITransactionMessageHandler = (message: ITransactionMessage) => void;
export type IPaymentMessageHandler = (message: IPaymentMessage) => void;

export enum SimpleSignerEventType {
    ON_CONNECT = 'onConnect',
    ON_READY = 'onReady',
    ON_SIGN = 'onSign',
    ON_CANCEL = 'onCancel',
    ON_PAYMENT = 'onPayment',
}

export enum SimpleSignerPageType {
    CONNECT = 'connect',
    SIGN = 'sign',
    PAYMENT = 'payment',
}

export default class Bridge {
    private mainActionPerformed = false;

    constructor(public pageType: SimpleSignerPageType) {
        window.addEventListener('beforeunload', () => {
            if (!this.mainActionPerformed) {
                this.sendMessage(EventFactory.createOnCancelEvent(this.pageType));
            }
        });
        window.addEventListener('message', (e) => this.messageHandler(e));
    }
    private availableWalletsMessageHandlers: IAvailableWalletsMessageHandler[] = [];
    private transactionMessageHandlers: ITransactionMessageHandler[] = [];
    private paymentMessageHandlers: IPaymentMessageHandler[] = [];

    public sendSignedTx(signedXDR: string) {
        this.mainActionPerformed = true;
        this.sendMessage(EventFactory.createOnSignEvent(signedXDR));
        this.closeWindow();
    }

    public sendOnReadyEvent() {
        this.sendMessage(EventFactory.createOnReadyEvent(this.pageType));
    }

    public sendOnCancelEvent() {
        this.closeWindow();
    }

    public sendOnConnectEvent(publicKey: string, wallet: string): void {
        this.mainActionPerformed = true;
        this.sendMessage(EventFactory.createOnConnectEvent(publicKey, wallet));
    }

    public addAvailableWalletsMessageHandler(handler: IAvailableWalletsMessageHandler) {
        this.availableWalletsMessageHandlers.push(handler);
    }

    public addTransactionMessageHandler(handler: ITransactionMessageHandler) {
        this.transactionMessageHandlers.push(handler);
    }

    public addPaymentMessageHandler(handler: IPaymentMessageHandler) {
        this.paymentMessageHandlers.push(handler);
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

    public getPaymentMessageFromUrl(queryString?: string): IPaymentMessage | null {
        const urlParams = new URLSearchParams(queryString || window.location.search);
        const receiver = urlParams.get('receiver');
        const amount = urlParams.get('amount');
        const assetCode = urlParams.get('assetCode');
        const issuer = urlParams.get('issuer');

        if (receiver && amount && assetCode && issuer) {
            return {
                receiver,
                amount,
                assetCode,
                issuer,
            };
        } else {
            return null;
        }
    }

    public getWalletsFromUrl(): string[] {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.getAll('wallets');
    }

    public getRedirectFromUrl(): string | null {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('redirect');
    }

    private messageHandler(e: MessageEvent): void {
        if (!e || e.data === 'verify_ready') {
            return;
        }

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

        if ('receiver' in e.data && 'amount' in e.data && 'assetCode' in e.data && 'issuer' in e.data) {
            const message = e.data as IPaymentMessage;
            this.paymentMessageHandlers.forEach((handler) => handler(message));
            return;
        }
    }

    public closeWindow() {
        return window.close();
    }

    private sendMessage(message: ISimpleSignerEvent): void {
        if (window.opener) {
            window.opener.postMessage(message, '*');
        }
    }
}
