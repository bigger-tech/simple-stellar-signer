import type { Operation, Transaction, TrustLineFlag } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import type IOperationComponent from '../IOperationComponent';
import AllowTrustComponentSvelte from './AllowTrust.svelte';

export default class AllowTrustComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        assetCode: string;
        authorize: boolean | TrustLineFlag | undefined;
    };

    constructor(tx: Transaction, operation: Operation.AllowTrust) {
        this.component = AllowTrustComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            assetCode: operation.assetCode,
            authorize: operation.authorize,
        };
    }
}
