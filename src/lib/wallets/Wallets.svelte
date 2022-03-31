<script lang="ts">
    import WalletComponent from './WalletComponent';
    import { removeDuplicates } from '../../routes/connect/connectHelpers';
    export let wallets: string[];
    const duplicateFilter = removeDuplicates(wallets);

    wallets = duplicateFilter;
    const walletComponents = wallets.map((wallet) => new WalletComponent(wallet));
</script>

{#each walletComponents as wallet}
    <svelte:component this={wallet} />
{/each}
