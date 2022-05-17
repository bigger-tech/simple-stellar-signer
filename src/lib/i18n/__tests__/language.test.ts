/**
 * @vitest-environment jsdom
 */
import { expect } from 'vitest';

import { LanguageName } from '../LanguageName';
import WalletLanguage from '../WalletLanguage';

const language = new WalletLanguage().getLanguage();
let languagesMock: any;

beforeAll(() => {
    languagesMock = vi.spyOn(navigator, 'languages', 'get');
});

beforeEach(() => {
    languagesMock.mockReturnValue(null);
});

it('should return English as the default language', () => {
    expect(language).toBe(LanguageName.ENGLISH);
});
