declare const window: any;
import getBalance from '../operations/balanceOperation/balanceOperation';

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
    const permissions = await window.xBullSDK.connect({
        canRequestPublicKey: true,
        canRequestSign: true,
    });
    const publicKey = await window.xBullSDK.getPublicKey();
    console.log(publicKey, permissions);
    saveLocalStorage(publicKey, await getBalance(publicKey));
}
