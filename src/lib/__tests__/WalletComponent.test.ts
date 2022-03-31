/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import WalletComponent from '../wallets/WalletComponent';

it('should throw an error if a wallet is bad written', () => {
    expect(new WalletComponent('bad')).toThrow();
});
