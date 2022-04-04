import ClaimClaimableBalanceComponentSvelte from './ClaimClaimableBalance.svelte';
import type { Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class ClaimClaimableBalanceComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        balanceId: string;
    };

    constructor(tx: Transaction, operation: Operation.ClaimClaimableBalance) {
        this.component = ClaimClaimableBalanceComponentSvelte;

        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            balanceId: operation.balanceId,
        };
    }
}
