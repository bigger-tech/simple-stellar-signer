import type ISimpleSignerEvent from './ISimpleSignerEvent';

export default class EventFactory {
    static createOnReadyEvent(): ISimpleSignerEvent {
        return {
            type: 'onReady',
            message: 'Simple Signer is ready to operate',
        };
    }

    static createOnConnectEvent(publicKey: string, wallet: string): ISimpleSignerEvent {
        return {
            type: 'onConnect',
            message: {
                publicKey,
                wallet,
            },
        };
    }

    static createOnSignEvent(signedXDR: string): ISimpleSignerEvent {
        return {
            type: 'onSign',
            message: {
                signedXDR,
            },
        };
    }
}
