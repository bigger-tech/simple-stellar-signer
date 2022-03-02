import type IOnReadyEvent from './eventsInterfaces/IOnReadyEvent';
import type IOnConnectEvent from './eventsInterfaces/IOnConnectEvent';
import type IOnSignEvent from './eventsInterfaces/IOnSignEvent';

export function sendMessage(message: IOnConnectEvent | IOnReadyEvent | IOnSignEvent): void {
    const parentWindow = window.opener;
    parentWindow.postMessage(message, '*');
}

export function closeWindow() {
    return window.close();
}
