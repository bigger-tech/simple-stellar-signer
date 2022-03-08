import EventsClass from '../../helpers/EventsClass';
import { closeWindow, sendMessage } from '../../helpers/sendMessageHelpers';

export function sendSignedTx(signedXDR: string) {
    const signedEvent = EventsClass.onSignEvent(signedXDR);
    sendMessage(signedEvent);
    closeWindow();
}
