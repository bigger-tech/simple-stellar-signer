import { StellarSDK, server } from '../../api/stellarSDK';
import { buildTx } from './buildTxOperation';
import { signAlbedo } from '../../wallets/albedo';

export const submitTx = async (key: string, wallet: string, destination: string, amount: string) => {
    const tx = await buildTx(key, destination, amount);

    let signedXdr;

    wallet === 'albedo' ? (signedXdr = await signAlbedo(tx)) : '';

    if (signedXdr) {
        const newTx = StellarSDK.TransactionBuilder.fromXDR(signedXdr, 'TESTNET');
        server.submitTransaction(newTx).then((res) => console.log(res));
    } else {
        return console.error('There was an error trying to sign the tx');
    }
};
