import { writable } from 'svelte/store';

export const isPrivateKeyVisible = writable(false);
export const inputValue = writable('');
export const connectionError = writable('');
