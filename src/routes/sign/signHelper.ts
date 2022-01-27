import type { Keypair, Transaction } from 'stellar-sdk';

export async function signTx(tx: Transaction, secretKey: Keypair): Promise<void> {
    return tx.sign(secretKey);
}
