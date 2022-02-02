import CreateAccountComponent from './CreateAccount.svelte';
import type { Operation } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export type CreateAccountComponentType = {
    component: typeof SvelteComponent;
    props: {
        source: string | undefined;
        destination: string;
        startingBalance: string;
    };
};

export default class CreateAccount {
    createOperation(operation: Operation.CreateAccount): CreateAccountComponentType {
        return {
            component: CreateAccountComponent,
            props: {
                source: operation.source,
                destination: operation.destination,
                startingBalance: operation.startingBalance,
            },
        };
    }
}
