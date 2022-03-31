import WalletLanguage from '../helpers/WalletLanguage';
import { writable } from 'svelte/store';

export const publicKey = writable('');
export const language = writable(new WalletLanguage().getText());
export const detectedLanguage = writable(new WalletLanguage().getLanguage());
