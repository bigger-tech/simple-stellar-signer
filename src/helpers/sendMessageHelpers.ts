import type { IReadyEvent } from './eventInterfaces/IReadyEvent';
import type { IConnectedEvent } from './eventInterfaces/IConnectedEvent';
import type { ISignedEvent } from './eventInterfaces/ISignedEvent';

export function sendMessage(message: IConnectedEvent | IReadyEvent | ISignedEvent): void {
    const parentWindow = window.opener;
    parentWindow.postMessage(message, '*');
}

export function closeWindow() {
    return window.close();
}
