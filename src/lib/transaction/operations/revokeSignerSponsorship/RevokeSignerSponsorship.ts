import RevokeSignerSponsorshipComponentSvelte from './RevokeSignerSponsorship.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import { getSignerType } from '../operationsHelper';

export default class RevokeSignerSponsorshipComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        account: string;
        signer: string;
    };
    public signer: string;

    constructor(tx: Transaction, operation: Operation.RevokeSignerSponsorship) {
        this.signer = getSignerType(operation.signer);
        this.component = RevokeSignerSponsorshipComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            account: operation.account,
            signer: this.signer,
        };
    }
}
