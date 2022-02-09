import PathPaymentStrictSendComponentSvelte from './PathPaymentStrictSend.svelte';
import type { Asset, Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class PathPaymentStrictSendComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        sendAsset: string;
        sendAmount: string;
        destination: string;
        destAsset: string;
        destMin: string;
        path: Asset[];
    };

    constructor(tx: Transaction, operation: Operation.PathPaymentStrictSend) {
        this.component = PathPaymentStrictSendComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            sendAsset: operation.sendAsset.code,
            sendAmount: operation.sendAmount,
            destination: operation.destination,
            destAsset: operation.destAsset.code,
            destMin: operation.destMin,
            path: operation.path,
        };
    }
}
