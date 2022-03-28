/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';

import getParamsFromUrl from '../signHelpers';

it('should get url params', () => {
    const urlWithGoodParams = 'xdr=1234&description=1234';
    const params = getParamsFromUrl(urlWithGoodParams);
    expect(params?.xdr).toBe('1234');
    expect(params?.description).toBe('1234');
});

it('should not get url params', () => {
    const urlWithBadParams = 'xdrr=1234&descriptions=1234';
    const params = getParamsFromUrl(urlWithBadParams);
    expect(params?.xdr).toBe(undefined);
    expect(params?.description).toBe(undefined);
});

it('should get a xdr but not the description', () => {
    const urlWithBadParams = 'xdr=1234';
    const params = getParamsFromUrl(urlWithBadParams);
    expect(params?.xdr).toBe('1234');
    expect(params?.description).toBe(undefined);
});
