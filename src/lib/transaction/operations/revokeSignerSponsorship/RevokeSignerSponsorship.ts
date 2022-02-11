import RevokeSignerSponsorshipComponentSvelte from './RevokeSignerSponsorship.svelte';
import type { Operation, SignerKeyOptions, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export default class RevokeSignerSponsorshipComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        account: string;
        signer: SignerKeyOptions;
    };

    constructor(tx: Transaction, operation: Operation.RevokeSignerSponsorship) {
        this.component = RevokeSignerSponsorshipComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            account: operation.account,
            signer: operation.signer,
        };
    }
}
