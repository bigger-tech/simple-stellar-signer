import { writable } from 'svelte/store';
import type IState from '../interfaces/IState';

const baseStore: IState = {
    publicKey: '',
    wallet: '',
};

export const store = writable(baseStore);
