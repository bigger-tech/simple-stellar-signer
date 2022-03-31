import WalletLanguageFactory from './WalletLanguageFactory';
export default class WalletLanguage {
    getLanguage(): string {
        const lang: string = ((navigator.languages && navigator.languages[0] && navigator.language) || 'en').substr(
            0,
            2,
        );
        return lang;
    }
    getText(): any {
        const language: string = this.getLanguage();
        return new WalletLanguageFactory().create(language);
    }
}
