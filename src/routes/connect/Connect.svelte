<script lang="ts">
    import Bridge, { SimpleSignerPageType } from '../../lib/bridge/Bridge';
    import { setMinimumPopUpSize } from '../../lib/components/helpers/popUpSizeHelper';
    import Wallets from '../../lib/components/wallets/Wallets.svelte';
    import type IWallet from '../../lib/wallets/IWallet';
    import { language } from '../../store/global';
    import { postMessageWallets, urlOrDefaultWallets, wallets } from './connectStore';

    const parent = window.opener;
    const bridge = new Bridge(SimpleSignerPageType.CONNECT);
    $wallets = bridge.getWalletsFromUrl();

    if (parent && !$wallets.length) {
        bridge.addAvailableWalletsMessageHandler((message) => {
            $urlOrDefaultWallets = false;
            $wallets = message.wallets;
            $postMessageWallets = true;
        });
    }

    function handleOnConnect(event: CustomEvent) {
        const detail = event.detail;
        const publicKey: string = detail.publicKey;
        const wallet: IWallet = detail.wallet;
        bridge.sendOnConnectEvent(publicKey, wallet.getName());
    }

    bridge.sendOnReadyEvent();

    const minimumConnectPopupHeight = 210;
    const minimumConnectPopupWidth = 340;
    const defaultConnectPopupWidth = 360;
    const defaultConnectPopupHeight = 510;

    setMinimumPopUpSize(
        minimumConnectPopupHeight,
        minimumConnectPopupWidth,
        defaultConnectPopupHeight,
        defaultConnectPopupWidth,
    );
</script>

<div class="simple-signer-container">
    <div class="simple-signer-wallets">
        <span class="simple-signer select-wallet">{$language.SELECT_WALLET}</span>
        {#if $urlOrDefaultWallets}
            <Wallets on:connect={handleOnConnect} wallets={$wallets} />
        {/if}
        {#if $postMessageWallets}
            <Wallets on:connect={handleOnConnect} wallets={$wallets} />
        {/if}
    </div>
</div>

<style>
    .select-wallet {
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 21px;
    }
    .simple-signer-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .simple-signer-wallets {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        text-align: center;
        width: 310px;
    }
</style>
