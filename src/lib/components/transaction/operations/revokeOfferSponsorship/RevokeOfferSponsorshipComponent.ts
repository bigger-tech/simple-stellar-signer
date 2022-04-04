import RevokeOfferSponsorshipComponentSvelte from './RevokeOfferSponsorship.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class RevokeOfferSponsorshipComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        seller: string;
        offerId: string;
    };

    constructor(tx: Transaction, operation: Operation.RevokeOfferSponsorship) {
        this.component = RevokeOfferSponsorshipComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            seller: operation.seller,
            offerId: operation.offerId,
        };
    }
}
