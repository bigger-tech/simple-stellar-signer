/**
 * @vitest-environment jsdom
 */
import { Transaction } from 'stellar-sdk';
import { expect } from 'vitest';

import { albedo as albedoImg } from '../../../assets';
import LocalStorage from '../../storage/storage';
import Albedo from '../albedo/Albedo';

const storage = new LocalStorage();
const albedo = new Albedo(storage);
const xdr =
    'AAAAAgAAAACIKmLk3p78KfXDpIWAThUMwmZDd82CRFoygG0dm+BWxgAAAGQACu0LAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAD/ISAVP71pgpaxaZBpBkjGIvdxYNxnXrN0JkP5KM3+wAAAAAAAAAAO5rKAAAAAAAAAAAA';
const transaction = new Transaction(xdr, 'Test SDF Network ; September 2015');

const publicKeyMock = vi.fn().mockResolvedValue('1234');
const txMock = vi.fn().mockResolvedValue('getSignedTx');

const windowSpy = vi.spyOn(window as any, 'window', 'get');
windowSpy.mockImplementation(() => ({
    albedo: {
        tx: txMock,
        publicKey: publicKeyMock,
        isInstalled: vi.fn(),
    },
    localStorage: {
        clear: vi.fn(),
        setItem: vi.fn(),
    },
}));

it('publicKey should be called one time', async () => {
    await albedo.getPublicKey();
    expect(window.albedo.publicKey).toHaveBeenCalledTimes(1);
});

it('tx should be called one time', async () => {
    await albedo.sign(transaction);
    expect(window.albedo.tx).toHaveBeenCalledTimes(1);
});

it('should return friendly name', () => {
    const name = albedo.getFriendlyName();
    expect(name).toEqual('Albedo');
});

it('should return image', () => {
    const image = albedo.getImage();
    expect(image).toBe(albedoImg);
});
