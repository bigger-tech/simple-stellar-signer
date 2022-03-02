import type IOnReadyEvent from './eventsInterfaces/IOnReadyEvent';
import type IOnConnectEvent from './eventsInterfaces/IOnConnectEvent';
import type IOnSignEvent from './eventsInterfaces/IOnSignEvent';

export default class EventsClass {
    onReadyEvent(): IOnReadyEvent {
        return {
            type: 'onReady',
            message: 'Simple Signer is ready to operate',
        };
    }

    onConnectEvent(publicKey: string, wallet: string): IOnConnectEvent {
        return {
            type: 'onConnect',
            message: {
                publicKey,
                wallet,
            },
        };
    }

    onSignEvent(signedXDR: string): IOnSignEvent {
        return {
            type: 'onSign',
            message: {
                signedXDR,
            },
        };
    }
}
