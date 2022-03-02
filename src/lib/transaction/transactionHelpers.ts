import EventsClass from '../../helpers/EventsClass';
import { closeWindow, sendMessage } from '../../helpers/sendMessageHelpers';

export function sendSignedTx(signedXDR: string) {
    const signedEvent = new EventsClass().onSignEvent(signedXDR);
    sendMessage(signedEvent);
    closeWindow();
}
