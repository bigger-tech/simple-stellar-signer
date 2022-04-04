<script lang="ts">
    import type { Claimant } from 'stellar-sdk';

    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let amount: string;
    export let asset: string;
    export let claimants: Claimant[];
</script>

<div class="simple-signer create-claimable-balance-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_CREATE_CLAIMABLE_BALANCE}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.AMOUNT} {amount}</p>
    <p>{$language.ASSET} {asset}</p>
    <h3>{$language.CLAIMANTS}</h3>
    {#each claimants as claimant}
        <p>{claimant.destination}</p>
    {/each}
</div>
