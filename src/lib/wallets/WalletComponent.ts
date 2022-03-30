import Albedo from './components/Albedo.svelte';
import Freighter from './components/Freighter.svelte';
import PrivateKey from './components/PrivateKey.svelte';
import Rabet from './components/Rabet.svelte';
import XBull from './components/XBull.svelte';

export default class WalletComponent {
    wallet: string;
    constructor(wallet: string) {
        this.wallet = wallet;
        let walletComponent: any;

        switch (wallet) {
            case 'xbull':
                walletComponent = XBull;
                break;
            case 'albedo':
                walletComponent = Albedo;
                break;
            case 'freighter':
                walletComponent = Freighter;
                break;
            case 'rabet':
                walletComponent = Rabet;
                break;
            case 'privateKey':
                walletComponent = PrivateKey;
                break;
            default:
                undefined;
                break;
        }

        if (walletComponent) {
            return walletComponent;
        } else {
            throw new Error(`Unknown wallet: ${wallet}`);
        }
    }
}
