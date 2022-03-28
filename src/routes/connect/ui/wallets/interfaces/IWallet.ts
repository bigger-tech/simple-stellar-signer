import type { Keypair, Transaction } from 'stellar-sdk';
import type IConnectObject from './IConnectObject';

export default interface IWallet {
    getConnectObject(): IConnectObject;
    getPublicKey(keyPair?: Keypair): Promise<string>;
    logIn(key: string): Promise<void> | void;
    sign(tx: Transaction): Promise<string>;
}
