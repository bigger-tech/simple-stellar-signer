<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let selling: string;
    export let buying: string;
    export let amount: string;
    export let price: string;
</script>

<div class="simple-signer create-passive-sell-offer-operation">
    <h3>Operation: Create Passive Sell Offer</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Selling: {selling}</p>
    <p>Buying: {buying}</p>
    <p>Amount: {amount}</p>
    <p>Price: {price}</p>
</div>
