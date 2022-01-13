import { StellarSDK, server } from '../../api/stellarSDK';
import { buildTx } from './buildTxOperation';
import { signAlbedo } from '../../wallets/albedo';
import { signXbull } from '../../wallets/xBull';
import { signFreighter } from '../../wallets/freighter';

export const submitTx = async (key: string, wallet: string, destination: string, amount: string) => {
    const tx = await buildTx(key, destination, amount);

    let signedXdr;

    wallet === 'albedo' ? (signedXdr = await signAlbedo(tx)) : '';
    wallet === 'xbull' ? (signedXdr = await signXbull(tx)) : '';
    wallet === 'freighter' ? (signedXdr = await signFreighter(tx)) : '';

    if (signedXdr) {
        const newTx = StellarSDK.TransactionBuilder.fromXDR(signedXdr, 'TESTNET');
        server.submitTransaction(newTx).then((res) => console.log(res));
    } else {
        return console.error('There was an error trying to sign the tx');
    }
};
