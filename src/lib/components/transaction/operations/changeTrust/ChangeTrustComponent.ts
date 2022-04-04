import type { Asset, LiquidityPoolAsset, Operation, Transaction } from 'stellar-sdk';
import type { SvelteComponent } from 'svelte';

import ChangeTrustComponentSvelte from './ChangeTrust.svelte';

export default class ChangeTrustComponent {
    public component: typeof SvelteComponent;
    public props: {
        optionalSource: string | undefined;
        defaultSource: string;
        assetType: Asset | LiquidityPoolAsset;
        limit: string;
    };

    constructor(tx: Transaction, operation: Operation.ChangeTrust) {
        this.component = ChangeTrustComponentSvelte;
        this.props = {
            optionalSource: operation.source,
            defaultSource: tx.source,
            assetType: operation.line,
            limit: operation.limit,
        };
    }
}
