import EndSponsoringFutureReservesComponentSvelte from './EndSponsoringFutureReserves.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export default class EndSponsoringFutureReservesComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
    };

    constructor(tx: Transaction, operation: Operation.EndSponsoringFutureReserves) {
        this.component = EndSponsoringFutureReservesComponentSvelte;

        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
        };
    }
}
