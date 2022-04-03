import WalletLanguage from '../helpers/WalletLanguage';
import { writable } from 'svelte/store';

const walletLanguage = new WalletLanguage();
export const publicKey = writable('');
export const language = writable(await walletLanguage.getText());
export const detectedLanguage = writable(walletLanguage.getLanguage());
