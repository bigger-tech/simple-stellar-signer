<script lang="ts">
    import type { Asset } from 'stellar-sdk';
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let sendAsset: string;
    export let sendAmount: string;
    export let destination: string;
    export let destAsset: string;
    export let destMin: string;
    export let path: Asset[];
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer path-payment-strict-send-operation">
    <h3>{lang.OPERATION_TYPE} {lang.OPERATION_PATH_PAYMENT_STRICT_SEND}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.ASSET_TO_PAY} {sendAsset}</p>
    <p>{lang.AMOUNT} {sendAmount}</p>
    <p>{lang.DESTINATION} {destination}</p>
    {#if path.length >= 1}
        <p>{lang.PATH}</p>
        {#each path as path}
            <ul>{path}</ul>
        {/each}
    {/if}

    <br />
    <p>{lang.DESTINATION_ASSET} {destAsset}</p>
    <p>{lang.MINIMUM_AMOUNT_DESTINATION_ASSET} {destMin}</p>
</div>
