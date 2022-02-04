import CreateAccountComponent from './CreateAccount.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export type CreateAccountComponentType = {
    component: typeof SvelteComponent;
    props: {
        optionalSource: string | undefined;
        defaultSource: string;
        destination: string;
        startingBalance: string;
    };
};

export default class CreateAccount {
    createOperation(operation: Operation.CreateAccount, tx: Transaction): CreateAccountComponentType {
        return {
            component: CreateAccountComponent,
            props: {
                optionalSource: operation.source,
                defaultSource: tx.source,
                destination: operation.destination,
                startingBalance: operation.startingBalance,
            },
        };
    }
}
