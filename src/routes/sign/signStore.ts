import { writable } from 'svelte/store';

export const xdr = writable('');
export const description = writable('');
export const transactionGroups = writable([]);
export const isXdrNull = writable(false);
