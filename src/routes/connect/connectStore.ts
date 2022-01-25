import { writable } from 'svelte/store';

export const isPrivateKeyVisible = writable(false);
export const setInputValue = writable('');
export const setConnectionError = writable('');
