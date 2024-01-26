import { writable } from 'svelte/store';

export const areOperationsExpanded = writable(false);
export const isUserPublicKeyClicked = writable(false);
export const isSourceAccountClicked = writable(false);
export const isFeeSourceAccountClicked = writable(false);
export const operationsVisibility = writable([] as boolean[]);
