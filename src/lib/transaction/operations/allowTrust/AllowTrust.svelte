<script lang="ts">
    import type { TrustLineFlag } from 'stellar-sdk';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let assetCode: string;
    export let authorize: boolean | TrustLineFlag | undefined;
</script>

<div class="simple-signer allow-trust-operation">
    <h3>Operation: {authorize ? 'Allow' : 'Disallow'} Trust</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Asset: {assetCode}</p>

    {#if authorize === 2}
        <p>Authorization: The account is authorized to maintain orders, but not to perform other transactions</p>
    {:else if authorize}
        <p>Authorization: The account is authorized to transact with the asset</p>
    {:else}
        <p>Authorization: The account is not authorized to transact with the asset</p>
    {/if}
</div>
