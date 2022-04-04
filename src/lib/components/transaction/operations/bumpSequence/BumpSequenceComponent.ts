import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import BumpSequenceComponentSvelte from './BumpSequence.svelte';

export default class BumpSequenceComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        bumpTo: string;
    };

    constructor(tx: Transaction, operation: Operation.BumpSequence) {
        this.component = BumpSequenceComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            bumpTo: operation.bumpTo,
        };
    }
}
