import ClawbackComponentSvelte from './Clawback.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class ClawbackComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        asset: string;
        amount: string;
        from: string;
    };

    constructor(tx: Transaction, operation: Operation.Clawback) {
        this.component = ClawbackComponentSvelte;

        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            asset: operation.asset.code,
            amount: operation.amount,
            from: operation.from,
        };
    }
}
