import getBalance from '../operations/balanceOperation/balanceOperation';
import type { StellarSDK } from 'src/api/stellarSDK';

const getPublicKey = async (): Promise<string> => {
    await window.xBullSDK.connect({
        canRequestPublicKey: true,
        canRequestSign: true,
    });

    const pubKey = await window.xBullSDK.getPublicKey();

    return pubKey;
};

export const signXbull = async (tx: StellarSDK.Transaction) => {
    const signedTx = await window.xBullSDK.signXDR(tx.toXDR());
    return signedTx;
};

const saveLocalStorage = (key: string, balance: number) => {
    window.localStorage.clear();

    const user = {
        wallet: 'xbull',
        key,
        balance,
    };

    window.localStorage.setItem('user', JSON.stringify(user));

    window.location.href = '/wallet';
};

export async function initXBull() {
    const publicKey = await getPublicKey();
    saveLocalStorage(publicKey, await getBalance(publicKey));

    return publicKey;
}
