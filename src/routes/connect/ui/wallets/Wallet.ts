import type IWallet from './interfaces/IWallet';
import InvalidWalletException from '../../../../lib/errors/InvalidWalletException';
import Albedo from './Albedo';
import Freighter from './Freighter';
import PrivateKey from './PrivateKey';
import Rabet from './Rabet';
import XBull from './XBull';

export default class WalletFactory {
    create(name: string) {
        let wallet: IWallet;
        switch (name) {
            case Albedo.NAME:
                wallet = new Albedo();
                break;
            case XBull.NAME:
                wallet = new XBull();
                break;
            case Rabet.NAME:
                wallet = new Rabet();
                break;
            case Freighter.NAME:
                wallet = new Freighter();
                break;
            case PrivateKey.NAME:
                wallet = new PrivateKey();
                break;
            default:
                throw new InvalidWalletException();
        }
        return wallet;
    }
}
