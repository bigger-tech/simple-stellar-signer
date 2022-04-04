import type IXBull from './lib/wallets/xBull/IXBull';
import type IAlbedo from './lib/wallets/albedo/IAlbedo';
import type IRabet from './lib/wallets/rabet/IRabet';

declare global {
    interface Window {
        xBullSDK: IXBull;
        albedo: IAlbedo;
        rabet: IRabet;
    }
}

export {};
