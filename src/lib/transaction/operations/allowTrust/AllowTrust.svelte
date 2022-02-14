<script lang="ts">
    import type { TrustLineFlag } from 'stellar-sdk';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let assetCode: string;
    export let authorize: boolean | TrustLineFlag | undefined;
</script>

<div class="simple-signer allow-trust-operation">
    <h3>Operation: {authorize === 0 || false ? 'Disallow' : 'Allow'} Trust</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Asset: {assetCode}</p>

    {#if authorize === 0 || false}
        <p>Authorization: The account is not authorized to transact with the asset</p>
    {:else if authorize === 1 || true}
        <p>Authorization: the account is authorized to transact with the asset</p>
    {:else if authorize === 2}
        <p>Authorization: the account is authorized to maintain liabilities</p>
    {/if}
</div>
