import RevokeAccountSponsorshipComponentSvelte from './RevokeAccountSponsorship.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export default class RevokeAccountSponsorshipComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        account: string;
    };

    constructor(tx: Transaction, operation: Operation.RevokeAccountSponsorship) {
        this.component = RevokeAccountSponsorshipComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            account: operation.account,
        };
    }
}
