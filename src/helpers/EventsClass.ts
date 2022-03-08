import type ISimpleSignerEvent from './interfaces/ISimpleSignerEvent';

export default class EventsClass {
    static onReadyEvent(): ISimpleSignerEvent {
        return {
            type: 'onReady',
            message: 'Simple Signer is ready to operate',
        };
    }

    static onConnectEvent(publicKey: string, wallet: string): ISimpleSignerEvent {
        return {
            type: 'onConnect',
            message: {
                publicKey,
                wallet,
            },
        };
    }

    static onSignEvent(signedXDR: string): ISimpleSignerEvent {
        return {
            type: 'onSign',
            message: {
                signedXDR,
            },
        };
    }
}
