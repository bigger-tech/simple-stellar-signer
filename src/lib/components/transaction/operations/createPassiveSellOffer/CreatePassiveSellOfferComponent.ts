import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import type IOperationComponent from '../IOperationComponent';
import CreatePassiveSellOfferComponentSvelte from './CreatePassiveSellOffer.svelte';

export default class CreatePassiveSellOfferComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        selling: string;
        buying: string;
        amount: string;
        price: string;
    };

    constructor(tx: Transaction, operation: Operation.CreatePassiveSellOffer) {
        this.component = CreatePassiveSellOfferComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            selling: operation.selling.code,
            buying: operation.buying.code,
            amount: operation.amount,
            price: operation.price,
        };
    }
}
