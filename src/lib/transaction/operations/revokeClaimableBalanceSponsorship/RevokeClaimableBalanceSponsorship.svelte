<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let balanceId: string;
</script>

<div class="simple-signer revoke-claimable-balance-sponsorship-operation">
    <h3>Operation: Revoke Claimable Balance Sponsorship</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Balance ID: {balanceId}</p>
</div>
