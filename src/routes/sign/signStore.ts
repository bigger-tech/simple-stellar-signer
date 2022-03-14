import { writable } from 'svelte/store';

export const xdr = writable('');
export const description = writable('');
export const operationsDescription = writable([]);
export const isXdrNull = writable(false);
