import PathPaymentStrictReceiveComponentSvelte from './PathPaymentStrictReceive.svelte';
import type { Asset, Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class PathPaymentStrictReceiveComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        sendAsset: string;
        sendMax: string;
        destination: string;
        destAsset: string;
        destAmount: string;
        path: Asset[];
    };

    constructor(tx: Transaction, operation: Operation.PathPaymentStrictReceive) {
        this.component = PathPaymentStrictReceiveComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            sendAsset: operation.sendAsset.code,
            sendMax: operation.sendMax,
            destination: operation.destination,
            destAsset: operation.destAsset.code,
            destAmount: operation.destAmount,
            path: operation.path,
        };
    }
}
