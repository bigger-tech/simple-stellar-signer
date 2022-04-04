import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import type IOperationComponent from '../IOperationComponent';
import SetTrustLineFlagsComponentSvelte from './SetTrustLineFlags.svelte';

export default class SetTrustLineFlagsComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        trustor: string;
        asset: string;
        authorized: boolean | undefined;
        authorizedToMaintainLiabilities: boolean | undefined;
        clawbackEnabled: boolean | undefined;
    };

    constructor(tx: Transaction, operation: Operation.SetTrustLineFlags) {
        this.component = SetTrustLineFlagsComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            trustor: operation.trustor,
            asset: operation.asset.code,
            authorized: operation.flags.authorized,
            authorizedToMaintainLiabilities: operation.flags.authorizedToMaintainLiabilities,
            clawbackEnabled: operation.flags.clawbackEnabled,
        };
    }
}
