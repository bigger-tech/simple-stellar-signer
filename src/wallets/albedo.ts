import albedo from '@albedo-link/intent';

const getPublicKey = async (): Promise<string> => {
    const requestPubKey = await albedo.publicKey({
        token: 'qioeWlXjmiv+PFYwt0h82NmAT9gqk1HJUTBghHXJf28=',
    });

    const pubKey = requestPubKey.pubkey;

    return pubKey;
};

const saveLocalStorage = (key: string) => {
    window.localStorage.clear();

    const user = {
        wallet: 'albedo',
        key,
    };

    window.localStorage.setItem('user', JSON.stringify(user));

    window.location.href = '/wallet';
};

export const initAlbedo = async (): Promise<string> => {
    const pubKey = await getPublicKey();
    saveLocalStorage(pubKey);

    return pubKey;
};
