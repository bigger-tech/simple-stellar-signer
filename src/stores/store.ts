import { writable } from 'svelte/store';

export const isVisible = writable(false);
export const publicKey = writable('');
export const inputValue = writable('');
