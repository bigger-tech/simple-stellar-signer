import RevokeTrustlineSponsorshipComponentSvelte from './RevokeTrustlineSponsorship.svelte';
import type { Asset, LiquidityPoolId, Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';
import type IOperationComponent from '../IOperationComponent';

export default class RevokeTrustlineSponsorshipComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        asset: Asset | LiquidityPoolId;
        account: string;
    };

    constructor(tx: Transaction, operation: Operation.RevokeTrustlineSponsorship) {
        this.component = RevokeTrustlineSponsorshipComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            account: operation.account,
            asset: operation.asset,
        };
    }
}
