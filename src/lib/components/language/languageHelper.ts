import { isLanguageMenuVisible } from './languageStore';

export function hideMenu() {
    isLanguageMenuVisible.set(false);
}
