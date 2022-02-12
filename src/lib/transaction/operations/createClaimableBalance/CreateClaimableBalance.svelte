<script lang="ts">
    import type { Claimant } from 'stellar-sdk';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let amount: string;
    export let asset: string;
    export let claimants: Claimant[];
</script>

<div class="simple-signer create-claimable-balance-operation">
    <h3>Operation: Create Claimable Balance</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Amount: {amount}</p>
    <p>Asset: {asset}</p>
    <h3>Claimants:</h3>
    {#each claimants as claimant}
        <p>{claimant.destination}</p>
    {/each}
</div>
