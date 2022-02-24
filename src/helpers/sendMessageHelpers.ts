export function sendMessage(message: { ready?: boolean; message?: string }): void {
    const parentWindow = window.opener;
    parentWindow.postMessage(message, '*');
}

function closeWindowHandler() {
    return window.close();
}

export default function messageHandler(message: string) {
    sendMessage({ message });
    closeWindowHandler();
}
