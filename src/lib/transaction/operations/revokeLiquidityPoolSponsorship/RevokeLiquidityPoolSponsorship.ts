//It's neccessary to tell TS to ignore the line 24 (operation.liquidityPoolId) due to a bug in the types of the operation in stellar-base
//I have opened an issue in the stellar-base repository to fix it.

import RevokeLiquidityPoolSponsorshipComponentSvelte from './RevokeLiquidityPoolSponsorship.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

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
            //@ts-ignore
            liquidityPoolId: operation.liquidityPoolId,
        };
    }
}
