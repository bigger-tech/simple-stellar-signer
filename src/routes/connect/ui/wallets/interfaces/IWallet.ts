import type { Keypair, Transaction } from 'stellar-sdk';

export default interface IWallet {
    getPublicKey(keyPair?: Keypair): Promise<string>;
    logIn(privateKey?: string): Promise<void>;
    sign(tx: Transaction): Promise<string>;
}
