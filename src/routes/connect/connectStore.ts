import { writable } from 'svelte/store';

export const urlOrDefaultWallets = writable(true);
export const postMessageWallets = writable(false);
export const wallets = writable([] as string[]);
