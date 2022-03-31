<script lang="ts">
    import type { Asset } from 'stellar-sdk';
    import { language } from '../../../../store/store';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let sendAsset: string;
    export let sendAmount: string;
    export let destination: string;
    export let destAsset: string;
    export let destMin: string;
    export let path: Asset[];
</script>

<div class="simple-signer path-payment-strict-send-operation">
    <h3>{$language.OPERATION_TYPE} {$language.OPERATION_PATH_PAYMENT_STRICT_SEND}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ASSET_TO_PAY} {sendAsset}</p>
    <p>{$language.AMOUNT} {sendAmount}</p>
    <p>{$language.DESTINATION} {destination}</p>
    {#if path.length >= 1}
        <p>{$language.PATH}</p>
        {#each path as path}
            <ul>{path}</ul>
        {/each}
    {/if}

    <br />
    <p>{$language.DESTINATION_ASSET} {destAsset}</p>
    <p>{$language.MINIMUM_AMOUNT_DESTINATION_ASSET} {destMin}</p>
</div>
