import PaymentComponent from '../operations/Payment.svelte';
import type { Operation } from 'stellar-sdk';

export default class Payment {
    createPayment(operation: Operation.Payment) {
        return {
            amount: operation.amount,
            destination: operation.destination,
            asset: operation.asset.code,
            component: PaymentComponent,
        };
    }
}
