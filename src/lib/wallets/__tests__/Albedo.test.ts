/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import { Transaction } from 'stellar-sdk';
import Albedo from '../albedo/Albedo';
import { albedo as albedoImg } from '../../../assets';
import LocalStorage from '../../storage/storage';
const storage = new LocalStorage();
const albedo = new Albedo(storage);
const xdr =
    'AAAAAgAAAACIKmLk3p78KfXDpIWAThUMwmZDd82CRFoygG0dm+BWxgAAAGQACu0LAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAD/ISAVP71pgpaxaZBpBkjGIvdxYNxnXrN0JkP5KM3+wAAAAAAAAAAO5rKAAAAAAAAAAAA';
const transaction = new Transaction(xdr, 'Test SDF Network ; September 2015');

let albedoSpy: any;
const publicKeyMock = jest.fn().mockResolvedValue('1234');
const txMock = jest.fn();

beforeEach(() => {
    albedoSpy = jest.spyOn(window, 'window', 'get');
    albedoSpy.mockImplementation(() => ({
        albedo: {
            publicKey: publicKeyMock,
            tx: txMock.mockReturnValueOnce('1234'),
        },
        localStorage: { clear: jest.fn(), setItem: jest.fn() },
    }));
});

afterEach(() => {
    albedoSpy.mockRestore();
});

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
