<script lang="ts">
    import { Asset, LiquidityPoolId } from 'stellar-sdk';
    import WalletLanguage from '../../../../helpers/WalletLanguage';

    export let optionalSource: string;
    export let defaultSource: string;
    export let account: string;
    export let asset: Asset | LiquidityPoolId;

    const language = new WalletLanguage();
    const lang = language.getText();

    let assetType: Asset;
    let liquidityPoolId: LiquidityPoolId;

    if (asset instanceof Asset) {
        assetType = asset;
    } else if (asset instanceof LiquidityPoolId) {
        liquidityPoolId = asset;
    }
</script>

<div class="simple-signer revoke-trustline-sponsorship-operation">
    <h3>{lang.OPERATION} {lang.REVOKE_TRUSTLINE_SPONSORSHIP}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.ACCOUNT} {account}</p>
    {#if assetType}
        <p>{lang.ASSET} {assetType.code}</p>
    {:else if liquidityPoolId}
        <p>{lang.ASSET} {liquidityPoolId}</p>
    {:else}
        <p>{lang.ERROR}</p>
    {/if}
</div>
