import PaymentComponent from './Payment.svelte';
import type { Operation } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export type PaymentComponentType = {
    component: typeof SvelteComponent;
    props: {
        amount: string;
        asset: string;
        destination: string;
    };
};

export default class Payment {
    createOperation(operation: Operation.Payment): PaymentComponentType {
        return {
            component: PaymentComponent,
            props: {
                amount: operation.amount,
                asset: operation.asset.code,
                destination: operation.destination,
            },
        };
    }
}
