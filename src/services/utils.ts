import { getPublicKey } from './connect';

export const changeTitle = () => {
    const input = <HTMLInputElement>document.querySelector('#secret-key-input');
    const title = <HTMLInputElement>document.querySelector('#public-key-title');

    const publicKey = getPublicKey(input.value);
    input.value = '';
    if (!publicKey) {
        title.innerText = `Public Key: There was a problem, try again`;
    } else {
        title.innerText = `Public Key: ${publicKey}`;
    }
};
