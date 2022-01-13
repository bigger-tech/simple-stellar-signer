import { getPublicKey } from '@stellar/freighter-api';
import getBalance from '../operations/balanceOperation/balanceOperation';

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

export async function initFreighter() {
    let publicKey = '';

    try {
        publicKey = await getPublicKey();
    } catch (e) {
        console.log(e);
    }

    console.log(publicKey);
    saveLocalStorage(publicKey, await getBalance(publicKey));
}
