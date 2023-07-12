import type { Transaction } from 'stellar-sdk';
import type { ComponentType } from 'svelte';

export default interface IWallet {
    getPublicKey(privateKey?: string): Promise<string>;
    sign(tx: Transaction): Promise<string>;
    getName(): string;
    getFriendlyName(): string;
    getSvgIcon(): ComponentType;
    getExtension(): string;
    isInstalled(): Promise<boolean>;
}
