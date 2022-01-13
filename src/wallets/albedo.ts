import albedo from '@albedo-link/intent';
import getBalance from '../operations/balanceOperation/balanceOperation';

const getPublicKey = async (): Promise<string> => {
    const requestPubKey = await albedo.publicKey({
        token: 'qioeWlXjmiv+PFYwt0h82NmAT9gqk1HJUTBghHXJf28=',
    });

    const pubKey = requestPubKey.pubkey;

    return pubKey;
};

const saveLocalStorage = (key: string, balance: number) => {
    window.localStorage.clear();

    const user = {
        wallet: 'albedo',
        key,
        balance,
    };

    window.localStorage.setItem('user', JSON.stringify(user));

    window.location.href = '/wallet';
};

export const initAlbedo = async (): Promise<string> => {
    const pubKey = await getPublicKey();
    saveLocalStorage(pubKey, await getBalance(pubKey));

    return pubKey;
};
