import EventsClass from '../../../../helpers/EventsClass';
import { closeWindow, sendMessage } from '../../../../helpers/sendMessageHelpers';
import { storeItem, clearStorage } from '../../../../helpers/storage';

export default abstract class AbstractWallet {
    connectWithWallet(wallet: string, publicKey: string) {
        const connectEvent = EventsClass.onConnectEvent(publicKey, wallet);
        clearStorage();
        storeItem('wallet', wallet);
        sendMessage(connectEvent);
        closeWindow();
    }
}
