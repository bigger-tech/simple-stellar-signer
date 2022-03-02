import type { IOnSignEvent } from 'src/helpers/eventInterfaces/IOnSignEvent';
import { closeWindow, sendMessage } from '../../helpers/sendMessageHelpers';
let signedEvent: IOnSignEvent;

export function sendSignedTx(signedXdr: string) {
    signedEvent = {
        type: 'signed',
        message: {
            signedXdr,
        },
    };

    sendMessage(signedEvent);
    closeWindow();
}
