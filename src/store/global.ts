import type { ISignClient } from '@walletconnect/types';
import { writable } from 'svelte/store';

import type { ITranslation } from '../lib/i18n/ITranslation';
import WalletLanguage from '../lib/i18n/WalletLanguage';

const walletLanguage = new WalletLanguage();
export const publicKey = writable('');
export const language = writable({} as ITranslation);
export const detectedLanguage = writable(walletLanguage.getLanguage());
export const isLanguageLoading = writable(true);
export const isLogoutVisible = writable(false);
export const walletConnectClient = writable<ISignClient | undefined>();

walletLanguage.getText().then((lang) => {
    language.set(lang);
    isLanguageLoading.set(false);
});
