<script lang="ts">
    import { StrKey, xdr } from 'stellar-sdk';
    import WalletLanguage from '../../helpers/WalletLanguage';
    export let signatures: xdr.DecoratedSignature[];

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

{#if signatures.length > 0}
    <div class="simple-signer tx-signatures-container">
        <p>{lang.SIGNATURES}</p>
        <div class="simple-signer tx-signatures">
            {#each signatures as signature, i}
                <ul class="simple-signer tx-signature">
                    <p>{i + 1} - {lang.SIGNATURE}</p>
                    <li>
                        <p>{lang.HINT} {StrKey.encodeEd25519PublicKey(signature.hint())}</p>
                    </li>
                    <li>
                        <p>{StrKey.encodeSha256Hash(signature.signature())}</p>
                    </li>
                </ul>
            {/each}
        </div>
    </div>
{/if}

<style>
    .tx-signature {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    p {
        margin: 5px;
    }
</style>
