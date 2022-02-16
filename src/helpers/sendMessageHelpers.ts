export function messageHandler(message: string): string {
    const parentWindow = window.opener;
    const sendMessage = parentWindow.postMessage(message, '*');
    return sendMessage;
}

export function closeWindowHandler() {
    return window.close();
}

export function sendMessage(message: string) {
    messageHandler(message);
    closeWindowHandler();
}
