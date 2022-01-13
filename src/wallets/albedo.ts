import albedo from '@albedo-link/intent';
import getBalance from '../operations/balanceOperation/balanceOperation';
import type { StellarSDK } from 'src/api/stellarSDK';

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

export const signAlbedo = async (tx: StellarSDK.Transaction) => {
    const signedTx = await albedo.tx({ xdr: tx.toXDR(), network: 'testnet' });
    return signedTx.signed_envelope_xdr;
};

export const initAlbedo = async (): Promise<string> => {
    const pubKey = await getPublicKey();
    saveLocalStorage(pubKey, await getBalance(pubKey));

    return pubKey;
};
