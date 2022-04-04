<script lang="ts">
    import { isWaitingForWallets, wallets } from '../../store/global';
    import Bridge from '../../lib/bridge/Bridge';
    import Wallets from '../../lib/components/wallets/Wallets.svelte';
    import type IWallet from '../../lib/wallets/IWallet';
    const bridge = new Bridge();
    const urlParams = bridge.getWalletsFromUrl();
    const parent = window.opener;

    if (urlParams.length > 0) {
        $wallets = urlParams;
        $isWaitingForWallets = false;
    } else if (!parent) {
        $isWaitingForWallets = false;
    }

    bridge.addAvailableWalletsMessageHandler((message) => {
        $wallets = message.wallets;
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
        {#if !$isWaitingForWallets}
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
