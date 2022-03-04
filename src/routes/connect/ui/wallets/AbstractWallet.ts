import EventsClass from '../../../../helpers/EventsClass';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';

export default class AbstractWallet {
    static connectWithWallet(wallet: string, publicKey: string) {
        const connectEvent = new EventsClass().onConnectEvent(publicKey, wallet);
        clearStorage();
        storeItem(wallet, publicKey);
        sendMessage(connectEvent);
        closeWindow();
    }
}
