<script lang="ts">
    import { XDRIsValid, XDRValue } from './../store/state';
    import * as StellarSdk from 'stellar-sdk';
    let txData: any;
    const encodedQuery: string = encodeURI($XDRValue);
    export function validateXDR() {
        const XDRToValidate = StellarSdk.xdr.TransactionEnvelope.validateXDR(encodedQuery, 'base64');
        $XDRIsValid = XDRToValidate;
        return XDRToValidate;
    }
    try {
        txData = StellarSdk.TransactionBuilder.fromXDR(encodedQuery, 'testnet');
    } catch (error) {
        console.error(error);
    }
</script>

{#if txData}
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
