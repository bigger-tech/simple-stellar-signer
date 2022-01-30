import PaymentComponent from './Payment.svelte';
import type IDynamicOperationComponent from '../../IDynamicOperationComponent';
import type { Operation } from 'stellar-sdk';

export default class Payment {
    createOperation(operation: Operation.Payment): IDynamicOperationComponent {
        return {
            component: PaymentComponent,
            getProps() {
                return {
                    amount: operation.amount,
                    asset: operation.asset.code,
                    destination: operation.destination,
                };
            },
        };
    }
}
