import ManageDataComponentSvelte from './ManageData.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class ManageDataComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        name: string;
        value: Buffer | undefined;
    };

    constructor(tx: Transaction, operation: Operation.ManageData) {
        (this.component = ManageDataComponentSvelte),
            (this.props = {
                optionalSource: operation.source,
                defaultSource: tx.source,
                name: operation.name,
                value: operation.value,
            });
    }
}
