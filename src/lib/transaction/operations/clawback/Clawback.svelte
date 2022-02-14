<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let asset: string;
    export let amount: string;
    export let from: string;
</script>

<div class="simple-signer clawback-operation">
    <h3>Operation: Clawback</h3>

    <p>Source account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Asset: {asset}</p>
    <p>Amount: {amount}</p>
    <p>From: {from}</p>
</div>
