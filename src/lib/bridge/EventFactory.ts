import { SimpleSignerEventType, SimpleSignerPageType } from './Bridge';
import type ISimpleSignerEvent from './ISimpleSignerEvent';

export default class EventFactory {
    static createOnReadyEvent(pageType: SimpleSignerPageType): ISimpleSignerEvent {
        return {
            type: SimpleSignerEventType.ON_READY,
            message: 'Simple Signer is ready to operate',
            page: pageType,
        };
    }

    static createOnCancelEvent(pageType: SimpleSignerPageType): ISimpleSignerEvent {
        return {
            type: SimpleSignerEventType.ON_CANCEL,
            message: 'The operation was canceled by the user',
            page: pageType,
        };
    }

    static createOnConnectEvent(publicKey: string, wallet: string): ISimpleSignerEvent {
        return {
            type: SimpleSignerEventType.ON_CONNECT,
            message: {
                publicKey,
                wallet,
            },
            page: SimpleSignerPageType.CONNECT,
        };
    }

    static createOnSignEvent(signedXDR: string): ISimpleSignerEvent {
        return {
            type: SimpleSignerEventType.ON_SIGN,
            message: {
                signedXDR,
            },
            page: SimpleSignerPageType.SIGN,
        };
    }
}
