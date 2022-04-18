<script lang="ts">
    import Bridge from '../../lib/bridge/Bridge';
    import Wallets from '../../lib/components/wallets/Wallets.svelte';
    import type IWallet from '../../lib/wallets/IWallet';
    import { postMessageWallets, urlOrDefaultWallets, wallets } from './connectStore';

    const parent = window.opener;

    const bridge = new Bridge();
    $wallets = bridge.getWalletsFromUrl();

    if (parent) {
        $urlOrDefaultWallets = false;
    }

    bridge.addAvailableWalletsMessageHandler((message) => {
        $urlOrDefaultWallets = false;
        $wallets = message.wallets;
        $postMessageWallets = true;
    });

    function handleOnConnect(event: CustomEvent) {
        const detail = event.detail;
        const publicKey: string = detail.publicKey;
        const wallet: IWallet = detail.wallet;
        bridge.sendOnConnectEvent(publicKey, wallet.getName());
    }

    bridge.sendOnReadyEvent();
</script>

<div class="simple-signer-container">
    <div class="simple-signer-wallets">
        {#if $urlOrDefaultWallets}
            <Wallets on:connect={handleOnConnect} wallets={$wallets} />
        {/if}
        {#if $postMessageWallets}
            <Wallets on:connect={handleOnConnect} wallets={$wallets} />
        {/if}
    </div>
</div>

<style>
    .simple-signer-container {
        display: flex;
        justify-content: center;
    }
    .simple-signer-wallets {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        text-align: center;
        width: 290px;
    }
</style>
