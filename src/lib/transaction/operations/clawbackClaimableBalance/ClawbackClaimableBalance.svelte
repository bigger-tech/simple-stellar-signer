<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let balanceId: string;
</script>

<div class="simple-signer clawback-claimable-balance-operation">
    <h3>Operation: Clawback Claimable Balance</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Balance ID: {balanceId}</p>
</div>
