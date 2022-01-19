<script lang="ts">
    // import StellarSdk from 'stellar-sdk';
    import { Link } from 'svelte-navigator';

    // const txRenderer = (xdr: string) => {
    //     return console.log(JSON.stringify(StellarSdk.xdr.TransactionEnvelope.fromXDR(xdr, 'base64')));
    // };

    // -> { id: "123", splat: "pauls-profile" }
    let XDRValue: string;

    const xdrQuery = new URLSearchParams(window.location.search);
    xdrQuery.has('xdr');
    const XDRQuery = xdrQuery.get('xdr');
    console.log(XDRQuery);
</script>

<h1>Sign</h1>

<p>View transaction history using XDR</p>

<input type="text" id="xdr" bind:value="{XDRValue}" />
<Link to="?xdr={XDRValue}">Submit XDR</Link>
<label for="#xdr">Paste your XDR here to view transaction history</label>
<div>{XDRValue}</div>
<!-- {#if XDRValue != undefined}
    <button on:click="{txRenderer(XDRValue)}">Show transaction data</button>
{/if} -->

<p class="simple-signer payment-tx">
    John pays 100.00 to Dominic GAVPIQ5RZCTNXWB5257PEQEZUBUKE37RQ4ZGDCNZPTKK3KLXGVIP2DBJ
</p>
<button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
