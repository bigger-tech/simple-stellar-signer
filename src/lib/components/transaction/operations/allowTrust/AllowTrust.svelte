<script lang="ts">
    import type { TrustLineFlag } from 'stellar-sdk';

    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let assetCode: string;
    export let authorize: boolean | TrustLineFlag | undefined;
</script>

<div class="simple-signer allow-trust-operation">
    <h3>
        {$language.OPERATION}
        {authorize ? `${$language.ALLOW_TRUST}` : `${$language.DISALLOW_TRUST}`}
        {$language.OPERATION_ACCOUNT_TRUST}
    </h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ASSET} {assetCode}</p>

    {#if authorize === 2}
        <p>{$language.AUTHORIZED_TO_MAINTAIN_ORDERS}</p>
    {:else if authorize}
        <p>{$language.AUTHORIZED_TO_TRANSACT}</p>
    {:else}
        <p>{$language.NOT_AUTHORIZED_TO_TRANSACT}</p>
    {/if}
</div>
