import type { ITranslation } from './ITranslation';
import { LanguageName } from './LanguageName';
import * as english from './languages/english.json';

export default class WalletLanguageFactory {
    async create(language: string): Promise<ITranslation> {
        let module: ITranslation;
        switch (language) {
            case LanguageName.SPANISH:
                module = (await import('./languages/spanish.json')).default as ITranslation;
                break;
            default:
                module = english as ITranslation;
                break;
        }
        return module;
    }
}
