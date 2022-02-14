<script lang="ts">
    import { SignerKeyOptions, StrKey } from 'stellar-sdk';
    import { instanceOfEd25519PublicKey, instanceOfSha256, instanceOfPreAuthTx } from '../operationsHelper';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
    export let signer: SignerKeyOptions;

    let ed25519Data: string;
    let sha256Data: string | Buffer;
    let preAuthTxData: string | Buffer;

    if (instanceOfEd25519PublicKey(signer)) {
        ed25519Data = signer.ed25519PublicKey;
    } else if (instanceOfSha256(signer)) {
        if (typeof signer.sha256Hash === 'string') {
            sha256Data = signer.sha256Hash;
        } else {
            sha256Data = StrKey.encodeSha256Hash(signer.sha256Hash);
        }
    } else if (instanceOfPreAuthTx(signer)) {
        if (typeof signer.preAuthTx === 'string') {
            preAuthTxData = signer.preAuthTx;
        } else {
            preAuthTxData = StrKey.encodePreAuthTx(signer.preAuthTx);
        }
    }
</script>

<div class="simple-signer revoke-signer-sponsorship-operation">
    <h3>Operation: Revoke Signer Sponsorship</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Account: {account}</p>

    {#if ed25519Data}
        <p>Signer: {ed25519Data}</p>
    {:else if sha256Data}
        <p>Signer: {sha256Data}</p>
    {:else if preAuthTxData}
        <p>Signer: {preAuthTxData}</p>
    {/if}
</div>
