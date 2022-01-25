<script lang="ts">
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';

    const isValidXdr = writable(false);
    let tx: Transaction;
    const xdrValue = location.search.substring(5);
    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(xdrValue, 'base64');
        tx = new Transaction(xdrValue, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);
    } catch (error) {
        console.error(error);
    }
</script>

{#if $isValidXdr}
    <div class="simple-signer payment-tx">
        <p class="src-account">
            Source account: {tx ? tx['_source'] : ''}
        </p>
        <p class="sequence-number">Sequence number: {tx ? tx['_sequence'] : ''}</p>
        <p class="time-bounds">
            Time bounds: {tx ? `Min time ${tx['_timeBounds'].minTime} Max time ${tx['_timeBounds'].maxTime}` : ''}
        </p>
        <p class="operations">Operations: {tx ? JSON.stringify(tx['_operations']) : ''}</p>
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
