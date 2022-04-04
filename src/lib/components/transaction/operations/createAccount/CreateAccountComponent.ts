import CreateAccountComponentSvelte from './CreateAccount.svelte';
import type IOperationComponent from '../IOperationComponent';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export default class CreateAccountComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        destination: string;
        startingBalance: string;
    };

    constructor(tx: Transaction, operation: Operation.CreateAccount) {
        this.component = CreateAccountComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            destination: operation.destination,
            startingBalance: operation.startingBalance,
        };
    }
}
