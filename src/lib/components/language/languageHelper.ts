import WalletLanguage from '../../../lib/i18n/WalletLanguage';
import { language } from '../../../store/global';

const walletLanguage = new WalletLanguage();

export async function changeLanguage(languageISO: string) {
    const newLanguage = await walletLanguage.getText(languageISO);
    language.set(newLanguage);
}
