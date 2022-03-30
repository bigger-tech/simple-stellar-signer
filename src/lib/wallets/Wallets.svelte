<script lang="ts">
    import WalletComponent from './WalletComponent';
    import { removeDuplicates } from '../../routes/connect/connectHelpers';
    export let wallets: string[];
    let walletComponents: WalletComponent[] = [];

    const duplicateFilter = removeDuplicates(wallets);
    wallets = duplicateFilter;

    for (let i = 0; i < wallets.length; i++) {
        const walletComponent = new WalletComponent(wallets[i]!);
        walletComponents.push(walletComponent);
    }
</script>

{#each walletComponents as wallet}
    <svelte:component this={wallet} />
{/each}
