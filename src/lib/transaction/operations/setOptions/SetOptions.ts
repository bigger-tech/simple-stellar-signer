import SetOptionsComponentSvelte from './SetOptions.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class SetOptionsComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        inflationDest: string | undefined;
        clearFlags: number | undefined;
        setFlags: number | undefined;
        masterWeight: number | undefined;
        lowThreshold: number | undefined;
        medThreshold: number | undefined;
        highThreshold: number | undefined;
    };

    constructor(tx: Transaction, operation: Operation.SetOptions) {
        (this.component = SetOptionsComponentSvelte),
            (this.props = {
                optionalSource: operation.source,
                defaultSource: tx.source,
                inflationDest: operation.inflationDest,
                clearFlags: operation.clearFlags,
                setFlags: operation.setFlags,
                masterWeight: operation.masterWeight,
                lowThreshold: operation.lowThreshold,
                medThreshold: operation.medThreshold,
                highThreshold: operation.highThreshold,
            });
    }
}
