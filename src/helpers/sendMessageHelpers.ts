import type { IOnReadyEvent } from './eventInterfaces/IOnReadyEvent';
import type { IOnConnectEvent } from './eventInterfaces/IOnConnectEvent';
import type { IOnSignEvent } from './eventInterfaces/IOnSignEvent';

export function sendMessage(message: IOnConnectEvent | IOnReadyEvent | IOnSignEvent): void {
    const parentWindow = window.opener;
    parentWindow.postMessage(message, '*');
}

export function closeWindow() {
    return window.close();
}
