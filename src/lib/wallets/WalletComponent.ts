import UnknownWalletError from '../errors/UnknownWalletError';
import AlbedoComponent from './components/Albedo.svelte';
import FreighterComponent from './components/Freighter.svelte';
import PrivateKeyComponent from './components/PrivateKey.svelte';
import RabetComponent from './components/Rabet.svelte';
import XBullComponent from './components/XBull.svelte';
import Albedo from '../../routes/connect/ui/wallets/Albedo';
import Freighter from '../../routes/connect/ui/wallets/Freighter';
import PrivateKey from '../../routes/connect/ui/wallets/PrivateKey';
import Rabet from '../../routes/connect/ui/wallets/Rabet';
import XBull from '../../routes/connect/ui/wallets/XBull';

export default class WalletComponent {
    wallet: string;
    constructor(wallet: string) {
        this.wallet = wallet;
        let walletComponent: any;

        switch (wallet) {
            case XBull.NAME:
                walletComponent = XBullComponent;
                break;
            case Albedo.NAME:
                walletComponent = AlbedoComponent;
                break;
            case Freighter.NAME:
                walletComponent = FreighterComponent;
                break;
            case Rabet.NAME:
                walletComponent = RabetComponent;
                break;
            case PrivateKey.NAME:
                walletComponent = PrivateKeyComponent;
                break;
            default:
                undefined;
                break;
        }

        if (walletComponent) {
            return walletComponent;
        } else {
            throw new UnknownWalletError(wallet);
        }
    }
}
