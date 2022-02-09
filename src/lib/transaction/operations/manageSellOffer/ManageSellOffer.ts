import ManageSellOfferComponentSvelte from './ManageSellOffer.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export default class ManageSellOfferComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        selling: string;
        buying: string;
        amount: string;
        price: string;
        offerId: string;
    };

    constructor(tx: Transaction, operation: Operation.ManageSellOffer) {
        this.component = ManageSellOfferComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            selling: operation.selling.code,
            buying: operation.buying.code,
            amount: operation.amount,
            price: operation.price,
            offerId: operation.offerId,
        };
    }
}
