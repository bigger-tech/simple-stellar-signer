<script lang="ts">
    import { Asset, LiquidityPoolAsset } from 'stellar-sdk';
    import { language } from '../../../../../store/global';

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
    <h3>{$language.OPERATION} {$language.OPERATION_CHANGE_TRUST}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    {#if asset}
        <p>{$language.ASSET} {asset.code}</p>
    {:else if liquidityPoolAsset}
        <p>{$language.ASSET_A} {liquidityPoolAsset.assetA.code}</p>
        <p>{$language.ASSET_B} {liquidityPoolAsset.assetB.code}</p>
    {/if}

    <p>{$language.LIMIT} {limit}</p>
</div>
