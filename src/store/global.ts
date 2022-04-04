import type { ITransactionMessage } from 'src/lib/bridge/transactionMessage/ITransactionMessage';
import { writable } from 'svelte/store';

import type { ITranslation } from '../lib/i18n/ITranslation';
import WalletLanguage from '../lib/i18n/WalletLanguage';

const walletLanguage = new WalletLanguage();
export const publicKey = writable('');
export const language = writable({} as ITranslation);
export const detectedLanguage = writable(walletLanguage.getLanguage());
export const transaction = writable({} as ITransactionMessage);
export const wallets = writable([] as string[]);

walletLanguage.getText().then((lang) => language.set(lang));
