import BeginSponsoringFutureReservesComponentSvelte from './BeginSponsoringFutureReserves.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class BeginSponsoringFutureReservesComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        sponsoredId: string;
    };

    constructor(tx: Transaction, operation: Operation.BeginSponsoringFutureReserves) {
        this.component = BeginSponsoringFutureReservesComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            sponsoredId: operation.sponsoredId,
        };
    }
}
