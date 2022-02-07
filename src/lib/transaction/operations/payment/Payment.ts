import PaymentComponent from './Payment.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export type PaymentComponentType = {
    component: typeof SvelteComponent;
    props: {
        amount: string;
        asset: string;
        destination: string;
        optionalSource: string | undefined;
        defaultSource: string;
    };
};

export default class Payment {    
    createOperation(operation: Operation.Payment): PaymentComponentType {
        return {
            component: PaymentComponent,
            props: {
                optionalSource: operation.source,
                defaultSource: tx.source,
                amount: operation.amount,
                asset: operation.asset.code,
                destination: operation.destination,
            },
        };
    }
}
