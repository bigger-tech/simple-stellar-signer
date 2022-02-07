import BeginSponsoringFutureReservesComponent from './BeginSponsoringFutureReserves.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export type BeginSponsoringFutureReservesComponentType = {
    component: typeof SvelteComponent;
    props: {
        type: string;
        optionalSource: string | undefined;
        defaultSource: string;
        sponsoredId: string;
    };
};

export default class BeginSponsoringFutureReserves {
    createOperation(
        operation: Operation.BeginSponsoringFutureReserves,
        tx: Transaction,
    ): BeginSponsoringFutureReservesComponentType {
        return {
            component: BeginSponsoringFutureReservesComponent,
            props: {
                type: operation.type,
                optionalSource: operation.source,
                defaultSource: tx.source,
                sponsoredId: operation.sponsoredId,
            },
        };
    }
}
