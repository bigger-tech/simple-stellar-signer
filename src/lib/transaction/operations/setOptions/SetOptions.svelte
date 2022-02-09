<script lang="ts">
    import type Ed25519PubpcKey from 'stellar-sdk';
    import type Sha256Hash from 'stellar-sdk';
    import type PreAuthTx from 'stellar-sdk';
    import { StrKey } from 'stellar-sdk';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let inflationDest: string | undefined;
    export let clearFlags: number | undefined;
    export let setFlags: number | undefined;
    export let masterWeight: number | undefined;
    export let lowThreshold: number | undefined;
    export let medThreshold: number | undefined;
    export let highThreshold: number | undefined;
    export let homeDomain: string | undefined;
    export let signer: typeof Ed25519PubpcKey | typeof Sha256Hash | typeof PreAuthTx;
    export let weight: number | undefined;
</script>

<div class="simple-signer set-options-operation">
    <h3>Operation: Set Options</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    {#if inflationDest}
        <p>Destination inflation: {inflationDest}</p>
    {/if}
    {#if clearFlags}
        <p>Clear Flags: {clearFlags}</p>
    {/if}
    {#if setFlags}
        <p>Set Flags: {setFlags}</p>
    {/if}
    {#if masterWeight}
        <p>Master Weight: {masterWeight}</p>
    {/if}
    {#if lowThreshold}
        <p>Low Threshold: {lowThreshold}</p>
    {/if}
    {#if medThreshold}
        <p>Medium Threshold: {medThreshold}</p>
    {/if}
    {#if highThreshold}
        <p>High Threshold: {highThreshold}</p>
    {/if}
    {#if homeDomain}
        <p>Home Domain: {homeDomain}</p>
    {/if}

    {#if signer}
        <h3>Signer</h3>
        {#if signer.ed25519PubpcKey}
            <p>ed25519PubpcKey: {signer.ed25519PubpcKey}</p>
            <p>Weight: {weight}</p>
        {:else if signer.sha256Hash}
            <p>sha256Hash: {StrKey.encodeSha256Hash(signer.sha256Hash)}</p>
            <p>Weight: {weight}</p>
        {:else if signer.preAuthTx}
            <p>preAuthTx: {StrKey.encodeSha256Hash(signer.preAuthTx)}</p>
            <p>Weight: {weight}</p>
        {/if}
    {/if}
</div>
