import type { ISignedEvent } from 'src/helpers/eventInterfaces/ISignedEvent';
import { closeWindow, sendMessage } from '../../helpers/sendMessageHelpers';
let signedEvent: ISignedEvent;

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
