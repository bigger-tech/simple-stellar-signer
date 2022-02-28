import type IWallet from './interfaces/IWallet';
import InvalidComponentTypeError from '../../../../lib/errors/InvalidComponentTypeError';
import Albedo from './Albedo';
import Freighter from './Freighter';
import PrivateKey from './PrivateKey';
import Rabet from './Rabet';
import XBull from './XBull';

export default class WalletFactory {
    create(name: string, privateKey?: string): IWallet {
        let wallet!: IWallet;
        switch (name) {
            case 'albedo':
                wallet = new Albedo();
                break;
            case 'xbull':
                wallet = new XBull();
                break;
            case 'rabet':
                wallet = new Rabet();
                break;
            case 'freighter':
                wallet = new Freighter();
                break;
            case 'privateKey':
                wallet = new PrivateKey(privateKey!);
                break;
            default:
                undefined;
                break;
        }
        if (wallet) {
            return wallet;
        } else {
            throw new InvalidComponentTypeError();
        }
    }
}
