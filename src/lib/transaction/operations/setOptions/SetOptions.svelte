<script lang="ts">
    import type Ed25519PubpcKey from 'stellar-sdk';
    import type Sha256Hash from 'stellar-sdk';
    import type PreAuthTx from 'stellar-sdk';
    import { StrKey } from 'stellar-sdk';
    import WalletLanguage from '../../../../helpers/WalletLanguage';

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

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer set-options-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_SET_OPTIONS}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    {#if inflationDest}
        <p>{lang.DESTINATION_INFLATION} {inflationDest}</p>
    {/if}
    {#if clearFlags}
        <p>{lang.CLEAR_FLAGS} {clearFlags}</p>
    {/if}
    {#if setFlags}
        <p>{lang.SET_FLAGS} {setFlags}</p>
    {/if}
    {#if masterWeight}
        <p>{lang.MASTER_WEIGHT} {masterWeight}</p>
    {/if}
    {#if lowThreshold}
        <p>{lang.LOW_THRESHOLD} {lowThreshold}</p>
    {/if}
    {#if medThreshold}
        <p>{lang.MEDIUM_THRESHOLD} {medThreshold}</p>
    {/if}
    {#if highThreshold}
        <p>{lang.HIGH_THRESHOLD} {highThreshold}</p>
    {/if}
    {#if homeDomain}
        <p>{lang.HOME_DOMAIN} {homeDomain}</p>
    {/if}

    {#if signer}
        <h3>{lang.SIGNER}</h3>
        {#if signer.ed25519PubpcKey}
            <p>{lang.ED5519PUBPCKEY} {signer.ed25519PubpcKey}</p>
            <p>{lang.WEIGHT} {weight}</p>
        {:else if signer.sha256Hash}
            <p>{lang.SHA256HASH} {StrKey.encodeSha256Hash(signer.sha256Hash)}</p>
            <p>{lang.WEIGHT} {weight}</p>
        {:else if signer.preAuthTx}
            <p>{lang.PREAUTH_TX} {StrKey.encodeSha256Hash(signer.preAuthTx)}</p>
            <p>{lang.WEIGHT} {weight}</p>
        {/if}
    {/if}
</div>
