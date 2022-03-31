import WalletLanguage from '../helpers/WalletLanguage';
import { writable } from 'svelte/store';

export const publicKey = writable('');
export const language = writable(await new WalletLanguage().getText());
export const detectLanguage = writable(new WalletLanguage().getLanguage());
