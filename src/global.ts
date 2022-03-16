import type IXBull from './routes/connect/ui/wallets/interfaces/IXBull';
import type Albedo from './routes/connect/ui/wallets/interfaces/IAlbedo';
import type IRabet from './routes/connect/ui/wallets/interfaces/IRabet';
declare global {
    interface Window {
        xBullSDK: IXBull;
        albedo: Albedo;
        rabet: IRabet;
    }
}

export {};
