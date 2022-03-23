<script lang="ts">
    import type { TrustLineFlag } from 'stellar-sdk';
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let assetCode: string;
    export let authorize: boolean | TrustLineFlag | undefined;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer allow-trust-operation">
    <h3>
        {lang.OPERATION}
        {authorize ? `${lang.ALLOW_TRUST}` : `${lang.DISALLOW_TRUST}`}
        {lang.OPERATION_ACCOUNT_TRUST}
    </h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.ASSET} {assetCode}</p>

    {#if authorize === 2}
        <p>{lang.AUTHORIZED_TO_MANTAIN_ORDERS}</p>
    {:else if authorize}
        <p>{lang.AUTHORIZED_TO_TRANSACT}</p>
    {:else}
        <p>{lang.NOT_AUTHORIZED_TO_TRANSACT}</p>
    {/if}
</div>
