<script lang="ts">
    import { Asset, LiquidityPoolAsset } from 'stellar-sdk';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let assetType: Asset | LiquidityPoolAsset;
    export let limit: string;

    let asset: Asset;
    let liquidityPoolAsset: LiquidityPoolAsset;

    if (assetType instanceof Asset) {
        asset = assetType;
    } else if (assetType instanceof LiquidityPoolAsset) {
        liquidityPoolAsset = assetType;
    }
</script>

<div class="simple-signer change-trust-operation">
    <h3>Operation: Change Trust</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    {#if asset}
        <p>Asset: {asset.code}</p>
    {:else if liquidityPoolAsset}
        <p>Asset A: {liquidityPoolAsset.assetA.code}</p>
        <p>Asset B: {liquidityPoolAsset.assetB.code}</p>
    {/if}

    <p>Limit: {limit}</p>
</div>
