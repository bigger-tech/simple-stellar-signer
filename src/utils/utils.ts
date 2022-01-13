import { submitTx } from '../operations/txOperation/submitOperation';

const getUserFromLocalStorage = () => {
    const localStorage = window.localStorage.getItem('user');

    if (localStorage) {
        const data = JSON.parse(localStorage);
        return { key: data.key, wallet: data.wallet };
    } else {
        console.log('null');
        return null;
    }
};

export const user = getUserFromLocalStorage();

export const handleForm = (e: Event) => {
    const destination = (<HTMLInputElement>document.querySelector('#destination')).value;
    const amount = (<HTMLInputElement>document.querySelector('#amount')).value;

    const user = getUserFromLocalStorage();

    submitTx(user?.key, user?.wallet, destination, amount);

    e.preventDefault();
};

export const onClickHandler = (e: Event) => {
    const form = <HTMLInputElement>document.querySelector('#form');
    const target = e.target as HTMLElement;

    if (form.classList.contains('hide')) {
        form.classList.remove('hide');
        target.innerText = 'Cancel';
    } else {
        target.innerText = 'Send a payment';
        form.classList.add('hide');
    }
};
