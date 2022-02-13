import type { Keypair, Transaction } from 'stellar-sdk';
import { sendMessage } from '../../helpers/sendMessageHelpers';

export function signTx(tx: Transaction, secretKey: Keypair) {
    const signTx = tx.sign(secretKey);
    const txSigned = tx.toXDR();
    sendMessage(txSigned);
    return signTx;
}
