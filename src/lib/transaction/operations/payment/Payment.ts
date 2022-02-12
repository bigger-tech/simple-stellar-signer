import PaymentComponentSvelte from './Payment.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class PaymentComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        amount: string;
        asset: string;
        destination: string;
        optionalSource: string | undefined;
        defaultSource: string;
    };

    constructor(tx: Transaction, operation: Operation.Payment) {
        this.component = PaymentComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            amount: operation.amount,
            asset: operation.asset.code,
            destination: operation.destination,
        };
    }
}
