import { writable } from 'svelte/store';

import type { ITransactionMessage } from '../../lib/bridge/transactionMessage/ITransactionMessage';

export const transaction = writable({} as ITransactionMessage);
