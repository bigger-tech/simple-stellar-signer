<script lang="ts">
    import type { Asset } from 'stellar-sdk';

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
    <h3>Operation type: Path Payment Strict Receive</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Asset you are using to pay: {sendAsset}</p>
    <p>Max amount: {sendMax}</p>
    <p>Destination: {destination}</p>
    {#if path.length >= 1}
        <p>Path:</p>
        {#each path as path}
            <p>{path.code}</p>
        {/each}
    {/if}
    <p>Destination asset: {destAsset}</p>
    <p>Amount: {destAmount}</p>
</div>
