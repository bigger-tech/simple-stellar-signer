import type ISimpleSignerEvent from './eventsInterfaces/ISimpleSignerEvent';

export default class EventsClass {
    onReadyEvent(): ISimpleSignerEvent {
        return {
            type: 'onReady',
            message: 'Simple Signer is ready to operate',
        };
    }

    onConnectEvent(publicKey: string, wallet: string): ISimpleSignerEvent {
        return {
            type: 'onConnect',
            message: {
                publicKey,
                wallet,
            },
        };
    }

    onSignEvent(signedXDR: string): ISimpleSignerEvent {
        return {
            type: 'onSign',
            message: {
                signedXDR,
            },
        };
    }
}
