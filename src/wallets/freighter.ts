import * as Freighter from '@stellar/freighter-api';
import getBalance from '../operations/balanceOperation/balanceOperation';
import type { StellarSDK } from 'src/api/stellarSDK';

const saveLocalStorage = (key: string, balance: number) => {
    window.localStorage.clear();

    const user = {
        wallet: 'freighter',
        key,
        balance,
    };

    window.localStorage.setItem('user', JSON.stringify(user));

    window.location.href = '/wallet';
};

export const signFreighter = async (tx: StellarSDK.Transaction) => {
    const signedTx = await Freighter.signTransaction(tx.toXDR(), 'TESTNET');
    return signedTx;
};

const getPublicKey = () => {
    const publicKey = Freighter.getPublicKey();
    return publicKey;
};

export async function initFreighter() {
    const publicKey = await getPublicKey();
    saveLocalStorage(publicKey, await getBalance(publicKey));
}
