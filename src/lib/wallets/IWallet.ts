import type { Transaction } from 'stellar-sdk';

export default interface IWallet {
    getPublicKey(privateKey?: string): Promise<string>;
    sign(tx: Transaction): Promise<string>;
    getName(): string;
    getFriendlyName(): string;
    getImage(): string;
}
