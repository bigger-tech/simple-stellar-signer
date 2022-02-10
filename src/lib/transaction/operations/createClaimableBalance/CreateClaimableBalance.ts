import CreateClaimableBalanceComponentSvelte from './CreateClaimableBalance.svelte';
import type { Claimant, Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

export default class CreateClaimableBalanceComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        amount: string;
        asset: string;
        claimants: Claimant[];
    };

    constructor(tx: Transaction, operation: Operation.CreateClaimableBalance) {
        this.component = CreateClaimableBalanceComponentSvelte;

        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            amount: operation.amount,
            asset: operation.asset.code,
            claimants: operation.claimants,
        };
    }
}
