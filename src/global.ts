import type IXBull from './routes/connect/ui/wallets/interfaces/IXBull';
import type Albedo from './routes/connect/ui/wallets/interfaces/IAlbedo';

declare global {
    interface Window {
        xBullSDK: IXBull;
        albedo: Albedo;
    }
}

export {};
