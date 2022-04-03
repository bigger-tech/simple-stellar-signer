/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import WalletComponent from '../wallets/WalletComponent';
import Albedo from '../wallets/components/Albedo.svelte';
import XBull from '../wallets/components/XBull.svelte';
import PrivateKey from '../wallets/components/PrivateKey.svelte';
import Rabet from '../wallets/components/Rabet.svelte';
import Freighter from '../wallets/components/Freighter.svelte';

it('should return an Svelte Component if a wallet is passed', () => {
    const albedo = new WalletComponent('albedo');
    const xbull = new WalletComponent('xbull');
    const freighter = new WalletComponent('freighter');
    const rabet = new WalletComponent('rabet');
    const privateKey = new WalletComponent('privateKey');
    expect(albedo).toBe(Albedo);
    expect(xbull).toBe(XBull);
    expect(freighter).toBe(Freighter);
    expect(rabet).toBe(Rabet);
    expect(privateKey).toBe(PrivateKey);
});

it('should throw an error if a wallet is bad written', () => {
    expect(() => new WalletComponent('albed')).toThrow('Unknown wallet: albed');
});
