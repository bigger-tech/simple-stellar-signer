import * as english from './languages/english.json';
import * as spanish from './languages/spanish.json';

export default class WalletLanguage {
    getLanguage() {
        let lang: any = ((navigator.languages && navigator.languages[0] && navigator.language) || 'en').substr(0, 2);

        if (!lang) {
            lang = 'en';
        }
        return lang;
    }
    getText() {
        const moduleLanguage: any = { es: spanish, en: english };
        const language = this.getLanguage();

        if (moduleLanguage[language]) {
            return moduleLanguage[language];
        } else {
            return moduleLanguage['en'];
        }
    }
}