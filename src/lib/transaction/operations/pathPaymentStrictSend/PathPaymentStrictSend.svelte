<script lang="ts">
    import type { Asset } from 'stellar-sdk';

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
    <h3>Operation type: Path Payment Strict Send</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Asset you are using to pay: {sendAsset}</p>
    <p>Amount: {sendAmount}</p>
    <p>Destination: {destination}</p>
    {#if path.length >= 1}
        <p>Path:</p>
        {#each path as path}
            <ul>{path}</ul>
        {/each}
    {/if}

    <br />
    <p>Destination asset: {destAsset}</p>
    <p>Minimum amount of destination asset to be received: {destMin}</p>
</div>
