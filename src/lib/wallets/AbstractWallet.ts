import type { Transaction } from 'stellar-sdk';

import NotImplementedError from '../errors/NotImplementedError';
import type IStorage from '../storage/IStorage';
import type IWallet from './IWallet';

export default abstract class AbstractWallet implements IWallet {
    protected readonly WALLET_STORAGE_KEY = 'wallet';
    protected readonly WALLET_PUBLIC_KEY_STORAGE_KEY = 'wallet_public_key';
    constructor(protected storage: IStorage) {}

    public getFriendlyName(): string {
        throw new NotImplementedError();
    }

    public getName(): string {
        throw new NotImplementedError();
    }

    public getPublicKey(_privateKey?: string): Promise<string> {
        throw new NotImplementedError();
    }

    public sign(_tx: Transaction): Promise<string> {
        throw new NotImplementedError();
    }

    public getImage(): string {
        throw new NotImplementedError();
    }

    public getExtension(): string {
        throw new NotImplementedError();
    }

    public isInstalled(): Promise<boolean> {
        throw new NotImplementedError();
    }

    protected persistWallet(publicKey: string): void {
        this.storage.clearStorage();
        this.storage.storeItem(this.WALLET_STORAGE_KEY, this.getName());
        this.storage.storeItem(this.WALLET_PUBLIC_KEY_STORAGE_KEY, publicKey);
    }
}
