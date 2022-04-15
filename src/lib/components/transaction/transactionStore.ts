import { writable } from 'svelte/store';

export const operationsExpanded = writable(false);
export const operationsVisibility = writable([] as boolean[]);
