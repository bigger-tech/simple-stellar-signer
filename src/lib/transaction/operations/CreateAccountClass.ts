import CreateAccountComponent from '../operations/CreateAccount.svelte';
import type { Operation } from 'stellar-sdk';

export default class CreateAccount {
    createCreateAccount(operation: Operation.CreateAccount) {
        return {
            source: operation.source,
            destination: operation.destination,
            startingBalance: operation.startingBalance,
            component: CreateAccountComponent,
        };
    }
}
