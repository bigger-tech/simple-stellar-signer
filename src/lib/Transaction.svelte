<script lang="ts">
    import { XDRIsValid } from './../store/state';
    import StellarSdk from 'stellar-sdk';
    let txData: any;
    const xdr = location.search.substring(5);
    const getTxData = (xdr: string) => {
        try {
            $XDRIsValid = StellarSdk.xdr.TransactionEnvelope.validateXDR(xdr, 'base64');
            txData = new StellarSdk.Transaction(xdr, 'testnet');

            return txData;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    getTxData(xdr);
</script>

{#if $XDRIsValid}
    <div class="simple-signer payment-tx">
        <p class="src-account">
            Source account: {txData != undefined ? txData._source : ''}
        </p>
        <p class="sequence-number">Sequence number: {txData != undefined ? txData._sequence : ''}</p>
        <p class="time-bounds">
            Time bounds: {txData != undefined
                ? 'Min time ' + txData._timeBounds.minTime + ' Max time ' + txData._timeBounds.maxTime
                : ''}
        </p>
        <p class="operations">Operations: {txData != undefined ? JSON.stringify(txData._operations) : ''}</p>
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
