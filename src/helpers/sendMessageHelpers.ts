export function sendMessage(message: string): string {
    const parentWindow = window.opener;
    const sendMessage = parentWindow.postMessage(message, '*');
    return sendMessage;
}

function closeWindowHandler() {
    return window.close();
}

export default function messageHandler(message: string) {
    sendMessage(message);
    closeWindowHandler();
}
