<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let selling: string;
    export let buying: string;
    export let buyAmount: string;
    export let price: string;
    export let offerId: string;
</script>

<div class="simple-signer manage-buy-offer-operation">
    <h3>Operation: Manage Buy Offer</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Selling asset: {selling}</p>
    <p>Buying asset: {buying}</p>
    <p>Buy amount: {buyAmount}</p>
    <p>Price: {price}</p>
    <p>Offer ID: {offerId}</p>
</div>
