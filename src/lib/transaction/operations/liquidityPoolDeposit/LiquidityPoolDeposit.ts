import LiquidityPoolDepositComponentSvelte from './LiquidityPoolDeposit.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class LiquidityPoolDepositComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        liquidityPoolId: string;
        maxAmountA: string;
        maxAmountB: string;
        minPrice: string;
        maxPrice: string;
    };

    constructor(tx: Transaction, operation: Operation.LiquidityPoolDeposit) {
        this.component = LiquidityPoolDepositComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            liquidityPoolId: operation.liquidityPoolId,
            maxAmountA: operation.maxAmountA,
            maxAmountB: operation.maxAmountB,
            minPrice: operation.minPrice,
            maxPrice: operation.maxPrice,
        };
    }
}
