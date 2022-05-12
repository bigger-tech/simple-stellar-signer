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

export function clickOutside(element: HTMLElement, callBackFunction: () => void) {
    // credits to https://svelte.dev/repl/8031c800d7e34fd692dd18174b514e4e?version=3.47.0
    function onClick(event: MouseEvent) {
        if (!element.contains(event.target as Node)) {
            callBackFunction();
        }
    }

    document.body.addEventListener('click', onClick);

    return {
        update(newCallbackFunction: () => void) {
            callBackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
        },
    };
}
