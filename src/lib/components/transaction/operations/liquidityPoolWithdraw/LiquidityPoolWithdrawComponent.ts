import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import type IOperationComponent from '../IOperationComponent';
import LiquidityPoolWithdrawComponentSvelte from './LiquidityPoolWithdraw.svelte';

export default class LiquidityPoolWithdrawComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        liquidityPoolId: string;
        amount: string;
        minAmountA: string;
        minAmountB: string;
    };

    constructor(tx: Transaction, operation: Operation.LiquidityPoolWithdraw) {
        this.component = LiquidityPoolWithdrawComponentSvelte;

        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            liquidityPoolId: operation.liquidityPoolId,
            amount: operation.amount,
            minAmountA: operation.minAmountA,
            minAmountB: operation.minAmountB,
        };
    }
}
