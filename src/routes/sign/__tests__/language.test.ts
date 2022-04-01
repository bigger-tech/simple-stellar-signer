/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import WalletLanguage from '../../../helpers/WalletLanguage';

const language = new WalletLanguage().getLanguage();
let languagesMock: jest.SpyInstance;

beforeAll(() => {
    languagesMock = jest.spyOn(navigator, 'languages', 'get');
});

beforeEach(() => {
    languagesMock.mockReturnValue(null);
});

it('should return default language', () => {
    const result = language;
    expect(result).toBe('en');
});
