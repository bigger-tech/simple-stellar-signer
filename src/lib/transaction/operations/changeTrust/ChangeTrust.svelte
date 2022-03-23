<script lang="ts">
    import { Asset, LiquidityPoolAsset } from 'stellar-sdk';
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let assetType: Asset | LiquidityPoolAsset;
    export let limit: string;

    const language = new WalletLanguage();
    const lang = language.getText();

    let asset: Asset;
    let liquidityPoolAsset: LiquidityPoolAsset;

    if (assetType instanceof Asset) {
        asset = assetType;
    } else if (assetType instanceof LiquidityPoolAsset) {
        liquidityPoolAsset = assetType;
    }
</script>

<div class="simple-signer change-trust-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_CHANGE_TRUST}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    {#if asset}
        <p>{lang.ASSET} {asset.code}</p>
    {:else if liquidityPoolAsset}
        <p>{lang.ASSET_A} {liquidityPoolAsset.assetA.code}</p>
        <p>{lang.ASSET_B} {liquidityPoolAsset.assetB.code}</p>
    {/if}

    <p>{lang.LIMIT} {limit}</p>
</div>
