import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import AccountMergeComponentSvelte from './AccountMerge.svelte';

export default class AccountMergeComponent {
    public component: typeof SvelteComponent;
    public props: {
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
