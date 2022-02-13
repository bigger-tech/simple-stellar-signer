export function messageHandler(message: string, url: string): string {
    const parentWindow = window.opener;
    const sendMessage = parentWindow.postMessage(message, url);
    return sendMessage;
}

export function closeWindowHandler() {
    return window.close();
}

export function sendMessage(message: string) {
    messageHandler(message, import.meta.env.VITE_HOST_SIMPLE_SIGNER_DEMO);
    closeWindowHandler();
}
