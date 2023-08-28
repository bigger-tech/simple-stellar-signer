import LocalStorage from '../storage/storage';
import type IWallet from './IWallet';
import InvalidWalletError from './InvalidWalletError';
import Albedo from './albedo/Albedo';
import Freighter from './freighter/Freighter';
import PrivateKey from './privateKey/PrivateKey';
import Rabet from './rabet/Rabet';
import WalletConnect from './walletConnect/WalletConnect';
import XBull from './xBull/XBull';

export default class WalletFactory {
    async createAll(): Promise<IWallet[]> {
        const promises = [Albedo.NAME, XBull.NAME, Rabet.NAME, Freighter.NAME, WalletConnect.NAME, PrivateKey.NAME].map(
            this.create,
        );
        return Promise.all(promises);
    }

    async create(name: string) {
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
            case WalletConnect.NAME:
                wallet = await (() => {
                    const wallet = new WalletConnect(storage);
                    return wallet.start();
                })();
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
