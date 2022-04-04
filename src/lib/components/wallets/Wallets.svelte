<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { language } from '../../../store/global';
    import { removeDuplicates } from '../../utils/utils';
    import type IWallet from '../../wallets/IWallet';
    import WalletFactory from '../../wallets/WalletFactory';
    import PrivateKey from '../../wallets/privateKey/PrivateKey';
    import Wallet from './Wallet.svelte';
    import { inputValue, isPrivateKeyFormVisible, isPrivateKeyVisible } from './walletsStore';

    export let wallets: string[];
    const walletFactory = new WalletFactory();
    const dispatch = createEventDispatcher();

    let filteredWallets: IWallet[];
    if (wallets.length) {
        filteredWallets = removeDuplicates(wallets).map(walletFactory.create);
    } else {
        filteredWallets = walletFactory.createAll();
    }

    async function connectWithPrivateKey(privateKey: string): Promise<void> {
        const wallet = walletFactory.create(PrivateKey.NAME);
        const publicKey = await wallet.getPublicKey(privateKey);
        dispatchOnConnectEvent(wallet, publicKey);
    }

    async function handleWalletConnect(event: CustomEvent): Promise<void> {
        const wallet: IWallet = event.detail.wallet;
        if (wallet.getName() === PrivateKey.NAME) {
            $isPrivateKeyFormVisible = true;
        } else {
            const publicKey = await wallet.getPublicKey();
            dispatchOnConnectEvent(wallet, publicKey);
        }
    }

    function dispatchOnConnectEvent(wallet: IWallet, publicKey: string): void {
        dispatch('connect', {
            wallet,
            publicKey,
        });
    }
</script>

{#if $isPrivateKeyFormVisible}
    <button class="simple-signer return-btn" on:click={() => ($isPrivateKeyFormVisible = !$isPrivateKeyFormVisible)}
        >{$language.RETURN}</button
    >
    <button class="simple-signer show-key-btn" on:click={() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}
        >{$isPrivateKeyVisible ? $language.HIDE_KEY : $language.SHOW_KEY}</button
    >

    {#if $isPrivateKeyVisible}
        <input id="input-key" type="text" bind:value={$inputValue} />
    {:else}
        <input id="input-key" type="password" bind:value={$inputValue} />
    {/if}

    <button class="simple-signer private-key-btn" on:click={() => connectWithPrivateKey($inputValue)}>
        {$language.CONNECT_WITH_PRIVATE_KEY}
    </button>
{:else}
    {#each filteredWallets as wallet}
        <Wallet wallet={wallet} on:connect={handleWalletConnect} />
    {/each}
{/if}
