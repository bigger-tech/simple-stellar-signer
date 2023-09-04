<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { language } from '../../../store/global';
    import type IWallet from '../../wallets/IWallet';
    import PrivateKey from '../../wallets/privateKey/PrivateKey';
    import WalletConnect from '../../wallets/walletConnect/WalletConnect';

    export let wallet: IWallet;
    export let isInstalled: boolean;

    const dispatch = createEventDispatcher();

    async function connect(): Promise<void> {
        let publicKey: string | null;

        if (wallet.getName() === PrivateKey.NAME) {
            publicKey = null;
        } else {
            publicKey = await wallet.getPublicKey();
        }

        dispatch('connect', { wallet, publicKey });
    }
</script>

<div class="simple-signer wallet-container">
    <div class="simple-signer wallet-items-container {isInstalled ? 'shadow' : ''}" on:click={connect}>
        <div class="simple-signer wallet-items {isInstalled ? '' : 'wallet-opacity'}">
            <div id="wallet-icon" class="simple-signer wallet-logo">
                <svelte:component this={wallet.getSvgIcon()} />
            </div>
            <span class="simple-signer wallet-title {isInstalled ? '' : 'wallet-title-opacity'}">
                {wallet.getFriendlyName()}
            </span>
        </div>

        {#if wallet.getName() !== WalletConnect.NAME}
            <a class="simple-signer {isInstalled ? '' : 'install-wallet'}" target="_blank" href={wallet.getExtension()}>
                {isInstalled ? '' : $language.INSTALL}
            </a>
        {/if}
    </div>
</div>

<style>
    .wallet-opacity,
    .wallet-title-opacity {
        opacity: 0.3;
    }
    .install-wallet {
        color: #2f69b7;
        text-align: center;
        line-height: 22px;
        background-color: #bbd8ff;
        width: 90px;
        height: 20px;
        margin-right: 15px;
        box-shadow: 0px 3px 3px -2px;
    }
    .wallet-logo {
        margin-left: 15px;
        display: flex;
        align-items: center;
        height: 37px;
        width: 35px;
    }

    .wallet-title {
        margin-left: 21px;
        letter-spacing: 0.14px;
        color: #1a1a1a;
    }

    .wallet-title:hover {
        color: #000;
    }

    a {
        text-decoration: inherit;
        color: inherit;
    }
    .wallet-items-container {
        display: flex;
        color: #bdbdbd;
        border: 1px solid #f5f5f5;

        width: 310px;
        height: 58px;
        margin-bottom: 15px;
        cursor: pointer;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .shadow {
        box-shadow: 0px 6px 8px -2px;
    }

    .wallet-items {
        display: flex;
        align-items: center;
    }

    .wallet-container {
        display: flex;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 14px;
    }
</style>
