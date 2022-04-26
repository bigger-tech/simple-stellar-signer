import WalletLanguage from '../../../lib/i18n/WalletLanguage';
import { language } from '../../../store/global';
import { isLanguageMenuVisible } from './languageStore';

const walletLanguage = new WalletLanguage();

export function hideMenu() {
    isLanguageMenuVisible.set(false);
}

export async function changeLanguage(languageISO: string) {
    const newLanguage = await walletLanguage.getText(languageISO);
    language.set(newLanguage);
}
