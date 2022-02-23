export function messageHandler(message: string): string {
    const parentWindow = window.opener;
    const sendMessage = parentWindow.postMessage(message, '*');
    return sendMessage;
}

function closeWindowHandler() {
    return window.close();
}

export default function sendMessage(message: string) {
    messageHandler(message);
    closeWindowHandler();
}
