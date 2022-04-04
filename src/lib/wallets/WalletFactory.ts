import Bridge from '../bridge/Bridge';
import LocalStorage from '../storage/storage';
import type IWallet from './IWallet';
import InvalidWalletError from './InvalidWalletError';
import Albedo from './albedo/Albedo';
import Freighter from './freighter/Freighter';
import PrivateKey from './privateKey/PrivateKey';
import Rabet from './rabet/Rabet';
import XBull from './xBull/XBull';

export default class WalletFactory {
    createAll(): IWallet[] {
        return [Albedo.NAME, XBull.NAME, Rabet.NAME, Freighter.NAME, PrivateKey.NAME].map(this.create);
    }

    create(name: string) {
        let wallet: IWallet;
        const storage = new LocalStorage();
        const bridge = new Bridge();
        switch (name) {
            case Albedo.NAME:
                wallet = new Albedo(bridge, storage);
                break;
            case XBull.NAME:
                wallet = new XBull(bridge, storage);
                break;
            case Rabet.NAME:
                wallet = new Rabet(bridge, storage);
                break;
            case Freighter.NAME:
                wallet = new Freighter(bridge, storage);
                break;
            case PrivateKey.NAME:
                wallet = new PrivateKey(bridge, storage);
                break;
            default:
                throw new InvalidWalletError();
        }
        return wallet;
    }
}
