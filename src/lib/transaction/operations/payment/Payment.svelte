<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let asset: string;
    export let destination: string;
    export let amount: string;
</script>

<div class="simple-signer payment-operation">
    <h3>Operation: Payment</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Asset: {asset}</p>
    <p>Destination: {destination}</p>
    <p>Amount: {amount}</p>
</div>
