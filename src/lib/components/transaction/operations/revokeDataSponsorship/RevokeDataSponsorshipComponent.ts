import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import type IOperationComponent from '../IOperationComponent';
import RevokeDataSponsorshipComponentSvelte from './RevokeDataSponsorship.svelte';

export default class RevokeDataSponsorshipComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        account: string;
        name: string;
    };

    constructor(tx: Transaction, operation: Operation.RevokeDataSponsorship) {
        this.component = RevokeDataSponsorshipComponentSvelte;

        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            account: operation.account,
            name: operation.name,
        };
    }
}
