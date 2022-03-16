import type { Keypair, Transaction } from 'stellar-sdk';

export default interface IWallet {
    getPublicKey(keyPair?: Keypair): Promise<string>;
    logIn(key: string): Promise<void> | void;
    sign(tx: Transaction): Promise<string>;
}
