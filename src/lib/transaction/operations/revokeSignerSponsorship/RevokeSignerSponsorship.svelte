<script lang="ts">
    import type { SignerKeyOptions } from 'stellar-sdk';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
    export let signer: SignerKeyOptions.Ed25519PublicKey;
</script>

<div class="simple-signer revoke-signer-sponsorship-operation">
    <h3>Operation: Revoke Signer Sponsorship</h3>
    {console.log(signer)}
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Account: {account}</p>

    <!-- {#if signer.ed25519PublicKey}
        <p>Signer: {ed255Type}</p>
    {:else if sha256Type}
        <p>Signer: {sha256Type}</p>
    {:else if preAuthTxType}
        <p>Signer: {preAuthTxType}</p>
    {/if} -->
</div>
