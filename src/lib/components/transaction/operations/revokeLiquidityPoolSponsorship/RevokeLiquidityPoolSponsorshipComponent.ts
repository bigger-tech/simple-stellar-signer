import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import type IOperationComponent from '../IOperationComponent';
import RevokeLiquidityPoolSponsorshipComponentSvelte from './RevokeLiquidityPoolSponsorship.svelte';

export default class RevokeLiquidityPoolSponsorshipComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        liquidityPoolId: string;
    };

    constructor(tx: Transaction, operation: Operation.RevokeLiquidityPoolSponsorship) {
        this.component = RevokeLiquidityPoolSponsorshipComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // Bug in the types of the operation in stellar-base
            liquidityPoolId: operation.liquidityPoolId,
        };
    }
}
