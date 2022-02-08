import ManageBuyOfferComponentSvelte from './ManageBuyOffer.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class ManageBuyOfferComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        selling: string;
        buying: string;
        buyAmount: string;
        price: string;
        offerId: string;
    };

    constructor(tx: Transaction, operation: Operation.ManageBuyOffer) {
        (this.component = ManageBuyOfferComponentSvelte),
            (this.props = {
                optionalSource: operation.source,
                defaultSource: tx.source,
                selling: operation.selling.code,
                buying: operation.buying.code,
                buyAmount: operation.buyAmount,
                price: operation.price,
                offerId: operation.offerId,
            });
    }
}
