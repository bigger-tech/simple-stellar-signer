<script lang="ts">
    import { Asset, LiquidityPoolId } from 'stellar-sdk';

    export let optionalSource: string;
    export let defaultSource: string;
    export let account: string;
    export let asset: Asset | LiquidityPoolId;
    let assetType: Asset;
    let liquidityPoolId: LiquidityPoolId;
    if (asset instanceof Asset) {
        assetType = asset;
    } else if (asset instanceof LiquidityPoolId) {
        liquidityPoolId = asset;
    }
</script>

<div class="simple-signer revoke-trustline-sponsorship-operation">
    <h3>Operation: Revoke Trustline Sponsorship</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Account: {account}</p>
    {#if assetType}
        <p>Asset: {assetType.code}</p>
    {:else if liquidityPoolId}
        <p>Asset: {liquidityPoolId}</p>
    {:else}
        <p>Error</p>
    {/if}
</div>
