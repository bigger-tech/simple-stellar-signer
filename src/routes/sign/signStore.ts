import type { ITransactionMessage } from '../../lib/bridge/transactionMessage/ITransactionMessage';
import { writable } from 'svelte/store';
export const isTransactionVisible = writable(true);
export const transaction = writable({} as ITransactionMessage);
