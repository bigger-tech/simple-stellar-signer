import { writable } from 'svelte/store';

export const isPrivateKeyVisible = writable(false);
export const isPrivateKeyFormVisible = writable(false);
export const isPrivateKeyInvalid = writable(false);
export const inputValue = writable('');
