<script lang="ts">
    import Bridge from '../../lib/bridge/Bridge';
    import Wallets from '../../lib/components/wallets/Wallets.svelte';
    import type IWallet from '../../lib/wallets/IWallet';

    const bridge = new Bridge();
    let availableWallets = bridge.getWalletsFromUrl();

    bridge.addAvailableWalletsMessageHandler((message) => {
        availableWallets = message.wallets;
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
        <Wallets on:connect={handleOnConnect} wallets={availableWallets} />
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
