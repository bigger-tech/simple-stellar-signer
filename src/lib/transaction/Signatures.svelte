<script lang="ts">
    import { StrKey, xdr } from 'stellar-sdk';

    export let signatures: xdr.DecoratedSignature[];
</script>

{#if signatures.length > 0}
    <div class="simple-signer tx-signatures-container">
        <p>Signatures:</p>
        <ol class="simple-signer tx-signatures">
            {#each signatures as signature, i}
                <p>{i + 1} - Signature:</p>
                <li class="simple-signer signatures-list">
                    <p>Hint: {StrKey.encodeEd25519PublicKey(signature.hint())}</p>
                    <p>Signature: {StrKey.encodeSha256Hash(signature.signature())}</p>
                </li>
            {/each}
        </ol>
    </div>
{:else}
    <p>Tx has no signature yet</p>
{/if}

<style>
    .signatures-list {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    p {
        margin: 5px;
    }
</style>
