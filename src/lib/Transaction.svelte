<script lang="ts">
    import { writable } from 'svelte/store';
    import * as StellarSdk from 'stellar-sdk';

    const isValidXdr = writable(false);
    let txData: StellarSdk.Transaction;
    const xdr = location.search.substring(5);
    try {
        $isValidXdr = StellarSdk.xdr.TransactionEnvelope.validateXDR(xdr, 'base64');
        txData = new StellarSdk.Transaction(xdr, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);
    } catch (error) {
        console.error(error);
    }
</script>

{#if $isValidXdr}
    <div class="simple-signer payment-tx">
        <p class="src-account">
            Source account: {txData ? txData['_source'] : ''}
        </p>
        <p class="sequence-number">Sequence number: {txData ? txData['_sequence'] : ''}</p>
        <p class="time-bounds">
            Time bounds: {txData
                ? `Min time ${txData['_timeBounds'].minTime} Max time ${txData['_timeBounds'].maxTime}`
                : ''}
        </p>
        <p class="operations">Operations: {txData ? JSON.stringify(txData['_operations']) : ''}</p>
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
