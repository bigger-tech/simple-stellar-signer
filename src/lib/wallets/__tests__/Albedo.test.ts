/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import Albedo from '../albedo/Albedo';
import Bridge from '../../bridge/Bridge';
import LocalStorage from '../../storage/storage';
const bridge = new Bridge();
const storage = new LocalStorage();
const albedo = new Albedo(bridge, storage);

let albedoSpy: any;
const publicKeyMock = jest.fn().mockResolvedValue('1234');

beforeEach(() => {
    albedoSpy = jest.spyOn(window, 'window', 'get');
    albedoSpy.mockImplementation(() => ({
        albedo: {
            publicKey: publicKeyMock,
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
