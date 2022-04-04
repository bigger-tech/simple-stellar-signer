import type Bridge from '../bridge/Bridge';
import type IStorage from '../storage/IStorage';

export default abstract class AbstractWallet {
    protected readonly WALLET_STORAGE_KEY = 'wallet';
    constructor(protected bridge: Bridge, protected storage: IStorage) {}
    connectWithWallet(wallet: string, publicKey: string) {
        this.storage.clearStorage();
        this.storage.storeItem(this.WALLET_STORAGE_KEY, wallet);
        this.bridge.sendOnConnectEvent(publicKey, wallet);
    }
}
