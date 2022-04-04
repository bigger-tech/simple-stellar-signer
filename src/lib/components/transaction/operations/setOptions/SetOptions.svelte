<script lang="ts">
    import type Ed25519PubpcKey from 'stellar-sdk';
    import type Sha256Hash from 'stellar-sdk';
    import type PreAuthTx from 'stellar-sdk';
    import { StrKey } from 'stellar-sdk';

    import { language } from '../../../../../store/global';

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
    <h3>{$language.OPERATION} {$language.OPERATION_SET_OPTIONS}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    {#if inflationDest}
        <p>{$language.DESTINATION_INFLATION} {inflationDest}</p>
    {/if}
    {#if clearFlags}
        <p>{$language.CLEAR_FLAGS} {clearFlags}</p>
    {/if}
    {#if setFlags}
        <p>{$language.SET_FLAGS} {setFlags}</p>
    {/if}
    {#if masterWeight}
        <p>{$language.MASTER_WEIGHT} {masterWeight}</p>
    {/if}
    {#if lowThreshold}
        <p>{$language.LOW_THRESHOLD} {lowThreshold}</p>
    {/if}
    {#if medThreshold}
        <p>{$language.MEDIUM_THRESHOLD} {medThreshold}</p>
    {/if}
    {#if highThreshold}
        <p>{$language.HIGH_THRESHOLD} {highThreshold}</p>
    {/if}
    {#if homeDomain}
        <p>{$language.HOME_DOMAIN} {homeDomain}</p>
    {/if}

    {#if signer}
        <h3>{$language.SIGNER}</h3>
        {#if signer.ed25519PubpcKey}
            <p>{$language.ED5519PUBPCKEY} {signer.ed25519PubpcKey}</p>
            <p>{$language.WEIGHT} {weight}</p>
        {:else if signer.sha256Hash}
            <p>{$language.SHA256HASH} {StrKey.encodeSha256Hash(signer.sha256Hash)}</p>
            <p>{$language.WEIGHT} {weight}</p>
        {:else if signer.preAuthTx}
            <p>{$language.PREAUTH_TX} {StrKey.encodeSha256Hash(signer.preAuthTx)}</p>
            <p>{$language.WEIGHT} {weight}</p>
        {/if}
    {/if}
</div>
