import AccountMergeComponentSvelte from './AccountMerge.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export default class AccountMergeComponent {
    component: typeof SvelteComponent;
    props: {
        optionalSource: string | undefined;
        defaultSource: string;
        destination: string;
    };

    constructor(tx: Transaction, operation: Operation.AccountMerge) {
        this.component = AccountMergeComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            destination: operation.destination,
        };
    }
}
