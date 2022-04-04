/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';

import { LanguageName } from '../LanguageName';
import WalletLanguage from '../WalletLanguage';

const language = new WalletLanguage().getLanguage();
let languagesMock: jest.SpyInstance;

beforeAll(() => {
    languagesMock = jest.spyOn(navigator, 'languages', 'get');
});

beforeEach(() => {
    languagesMock.mockReturnValue(null);
});

it('should return English as the default language', () => {
    expect(language).toBe(LanguageName.ENGLISH);
});
