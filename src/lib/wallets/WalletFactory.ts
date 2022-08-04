import LocalStorage from '../storage/storage';
import type IWallet from './IWallet';
import InvalidWalletError from './InvalidWalletError';
import Albedo from './albedo/Albedo';
import Freighter from './freighter/Freighter';
import Ledger from './ledger/Ledger';
import PrivateKey from './privateKey/PrivateKey';
import Rabet from './rabet/Rabet';
import XBull from './xBull/XBull';

export default class WalletFactory {
    createAll(): IWallet[] {
        return [Albedo.NAME, XBull.NAME, Rabet.NAME, Freighter.NAME, Ledger.NAME, PrivateKey.NAME].map(this.create);
    }

    create(name: string) {
        let wallet: IWallet;
        const storage = new LocalStorage();
        switch (name) {
            case Albedo.NAME:
                wallet = new Albedo(storage);
                break;
            case XBull.NAME:
                wallet = new XBull(storage);
                break;
            case Rabet.NAME:
                wallet = new Rabet(storage);
                break;
            case Freighter.NAME:
                wallet = new Freighter(storage);
                break;
            case Ledger.NAME:
                wallet = new Ledger(storage);
                break;
            case PrivateKey.NAME:
                wallet = new PrivateKey(storage);
                break;
            default:
                throw new InvalidWalletError();
        }
        return wallet;
    }
}
