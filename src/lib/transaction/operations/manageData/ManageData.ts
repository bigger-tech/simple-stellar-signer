import ManageDataComponent from './ManageData.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export type ManageDataComponentType = {
    component: typeof SvelteComponent;
    props: {
        type: string;
        optionalSource: string | undefined;
        defaultSource: string;
        name: string;
        value: Buffer | undefined;
    };
};

export default class ManageData {
    createOperation(operation: Operation.ManageData, tx: Transaction): ManageDataComponentType {
        return {
            component: ManageDataComponent,

            props: {
                type: operation.type,
                optionalSource: operation.source,
                defaultSource: tx.source,
                name: operation.name,
                value: operation.value,
            },
        };
    }
}
