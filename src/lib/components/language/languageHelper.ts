import { isLanguageMenuVisible } from './languageStore';

export function showMenu() {
    isLanguageMenuVisible.set(true);
}

export function hideMenu() {
    isLanguageMenuVisible.set(false);
}
