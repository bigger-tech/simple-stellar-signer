import type IAlbedo from './lib/wallets/albedo/IAlbedo';
import type IRabet from './lib/wallets/rabet/IRabet';
import type IXBull from './lib/wallets/xBull/IXBull';

declare global {
    interface Window {
        xBullSDK: IXBull;
        albedo: IAlbedo;
        rabet: IRabet;
    }
}

export {};
