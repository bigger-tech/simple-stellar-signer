import { signTx } from '../signHelper';
import { Transaction, Keypair } from 'stellar-sdk';
import { MOCK_NOT_SIGNED_TRANSACTION } from '../__mocks__/transaction';
import { expect } from '@jest/globals';

it('Sign transaction with Stellar', () => {
    const PRIVATE_KEY = 'SA5X2XYC2E4G6VP2CKOB7RDGXEHJ6WA5TSVHGEHWNEKKXH7RZLMUOLWL';
    const sourceKeys = Keypair.fromSecret(PRIVATE_KEY);
    const tx = new Transaction(MOCK_NOT_SIGNED_TRANSACTION, 'Test SDF Network ; September 2015');
    signTx(tx, sourceKeys);
    expect(tx.signatures).toHaveLength(1);
});
