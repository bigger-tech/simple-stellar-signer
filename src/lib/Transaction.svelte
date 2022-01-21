<script lang="ts">
    import { XDRIsValid } from './../store/state';
    import StellarSdk from 'stellar-sdk';
    let txData: any;
    const xdr = location.search.substring(5);
    $XDRIsValid = StellarSdk.xdr.TransactionEnvelope.validateXDR(xdr, 'base64');

    try {
        txData = new StellarSdk.Transaction(xdr, 'testnet');
    } catch (error) {
        console.error(error);
    }
</script>

{#if $XDRIsValid}
    <div class="simple-signer payment-tx">
        <p>
            Source account: {txData != undefined ? txData._source : ''}
        </p>
        <p>Sequence number: {txData != undefined ? txData._sequence : ''}</p>
        <p>
            Time bounds: {txData != undefined
                ? 'Min time ' + txData._timeBounds.minTime + ' Max time ' + txData._timeBounds.maxTime
                : ''}
        </p>
        <p>Operations: {txData != undefined ? JSON.stringify(txData._operations) : ''}</p>
    </div>
{:else}
    <h1>INVALID XDR</h1>
{/if}
