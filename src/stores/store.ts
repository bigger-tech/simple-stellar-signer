import { writable } from 'svelte/store';

export const visibility = writable(false);
export const publicKey = writable('waiting a connection...');
export const title = writable('');
