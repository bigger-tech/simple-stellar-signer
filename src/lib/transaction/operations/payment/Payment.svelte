<script lang="ts">
    export let asset: string;
    export let destination: string;
    export let amount: string;
</script>

<div class="simple-signer payment-operation">
    <h3>Payment:</h3>
    <p>Asset: {asset}</p>
    <p>Destination: {destination}</p>
    <p>Amount: {amount}</p>
</div>
