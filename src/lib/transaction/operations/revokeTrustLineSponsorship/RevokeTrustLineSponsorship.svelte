<script lang="ts">
    import { Asset, LiquidityPoolId } from 'stellar-sdk';
    import { language } from '../../../../store/store';
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
    <h3>{$language.OPERATION} {$language.OPERATION_REVOKE_TRUSTLINE_SPONSORSHIP}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ACCOUNT} {account}</p>
    {#if assetType}
        <p>{$language.ASSET} {assetType.code}</p>
    {:else if liquidityPoolId}
        <p>{$language.ASSET} {liquidityPoolId}</p>
    {:else}
        <p>{$language.ERROR}</p>
    {/if}
</div>
