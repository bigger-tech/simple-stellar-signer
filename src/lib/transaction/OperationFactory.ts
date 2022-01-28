import type { Operation, Transaction } from 'stellar-sdk';
import Payment from './operations/Payment.svelte';
import CreateAccount from './operations/CreateAccount.svelte';

export default class OperationFactory {
    transaction: Transaction;
    operation: Operation;
    constructor(transaction: Transaction, operation: Operation) {
        this.transaction = transaction;
        this.operation = operation;
    }

    payment(payment: Operation.Payment) {
        const component = Payment;
        const props = {
            asset: payment.asset.code,
            destination: payment.destination,
            amount: payment.amount,
        };
        return { component, props };
    }

    createAccount(createAccount: Operation.CreateAccount) {
        const component = CreateAccount;
        const props = {
            startingBalance: createAccount.startingBalance,
            destination: createAccount.destination,
            source: createAccount.source,
        };
        return { component, props };
    }

    createOperation() {
        let operation;

        switch (this.operation.type) {
            case 'payment':
                operation = this.payment(this.operation);
                break;
            case 'createAccount':
                operation = this.createAccount(this.operation);
                break;
            default:
                this.operation;
        }

        return operation;
    }
}
