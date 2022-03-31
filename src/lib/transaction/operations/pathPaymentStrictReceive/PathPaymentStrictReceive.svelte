<script lang="ts">
    import type { Asset } from 'stellar-sdk';
    import { language } from '../../../../store/store';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let sendAsset: string;
    export let sendMax: string;
    export let destination: string;
    export let destAsset: string;
    export let destAmount: string;
    export let path: Asset[];
</script>

<div class="simple-signer path-payment-strict-receive-operation">
    <h3>{$language.OPERATION_TYPE} {$language.OPERATION_PATH_PAYMENT_STRICT_RECEIVE}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ASSET_TO_PAY} {sendAsset}</p>
    <p>{$language.MAX_AMOUNT} {sendMax}</p>
    <p>{$language.DESTINATION} {destination}</p>
    {#if path.length >= 1}
        <p>{$language.PATH}</p>
        {#each path as path}
            <p>{path.code}</p>
        {/each}
    {/if}
    <p>{$language.DESTINATION_ASSET} {destAsset}</p>
    <p>{$language.AMOUNT} {destAmount}</p>
</div>
