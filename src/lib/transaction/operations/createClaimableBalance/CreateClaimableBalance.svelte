<script lang="ts">
    import type { Claimant } from 'stellar-sdk';
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let amount: string;
    export let asset: string;
    export let claimants: Claimant[];

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer create-claimable-balance-operation">
    <h3>{lang.OPERATION} {lang.CREATE_CLAIMABLE_BALANCE}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.AMOUNT} {amount}</p>
    <p>{lang.ASSET} {asset}</p>
    <h3>{lang.CLAIMANTS}</h3>
    {#each claimants as claimant}
        <p>{claimant.destination}</p>
    {/each}
</div>
