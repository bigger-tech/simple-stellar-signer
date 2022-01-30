import CreateAccountComponent from './CreateAccount.svelte';
import type { Operation } from 'stellar-sdk';
import type IDynamicOperationComponent from '../../IDynamicOperationComponent';

export default class CreateAccount {
    createOperation(operation: Operation.CreateAccount): IDynamicOperationComponent {
        return {
            component: CreateAccountComponent,
            getProps() {
                return {
                    source: operation.source,
                    destination: operation.destination,
                    startingBalance: operation.startingBalance,
                };
            },
        };
    }
}
