import { LanguageName } from './LanguageName';
import * as english from './languages/english.json';

export default class WalletLanguageFactory {
    create(language: string) {
        let module: any;
        switch (language) {
            case LanguageName.SPANISH:
                module = import('./languages/spanish.json');
                break;
            default:
                module = english;
                break;
        }
        return module;
    }
}
