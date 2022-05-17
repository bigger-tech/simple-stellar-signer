/**
 * @vitest-environment jsdom
 */
import { expect } from 'vitest';

import InvalidWalletError from '../InvalidWalletError';
import WalletFactory from '../WalletFactory';
import Albedo from '../albedo/Albedo';
import Freighter from '../freighter/Freighter';
import PrivateKey from '../privateKey/PrivateKey';
import Rabet from '../rabet/Rabet';
import XBull from '../xBull/XBull';

const factory = new WalletFactory();

it('should return a wallet', () => {
    const albedo = factory.create('albedo');
    const freighter = factory.create('freighter');
    const privateKey = factory.create('privateKey');
    const rabet = factory.create('rabet');
    const xbull = factory.create('xbull');
    expect(albedo).toBeInstanceOf(Albedo);
    expect(freighter).toBeInstanceOf(Freighter);
    expect(privateKey).toBeInstanceOf(PrivateKey);
    expect(rabet).toBeInstanceOf(Rabet);
    expect(xbull).toBeInstanceOf(XBull);
});

it('should throw an InvalidWalletError', () => {
    expect(() => factory.create('albed')).toThrow(InvalidWalletError);
});

it('should return all wallets', () => {
    const wallets = factory.createAll();
    expect(wallets).toHaveLength(5);
});
