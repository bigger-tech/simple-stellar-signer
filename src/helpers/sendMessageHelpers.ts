import type ISimpleSignerEvent from './eventsInterfaces/ISimpleSignerEvent';

export function sendMessage(message: ISimpleSignerEvent): void {
    const parentWindow = window.opener;
    parentWindow.postMessage(message, '*');
}

export function closeWindow() {
    return window.close();
}
