<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { language } from '../../../store/global';
    import type IWallet from '../../wallets/IWallet';
    import PrivateKey from '../../wallets/privateKey/PrivateKey';

    export let width = 35;
    export let height = 37;
    export let wallet: IWallet;

    const dispatch = createEventDispatcher();
    const isInstalled = wallet.isInstalled();

    async function connect(): Promise<void> {
        if (wallet.getName() === PrivateKey.NAME) {
            dispatch('connect', { wallet, publicKey: null });
        } else {
            dispatch('connect', { wallet, publicKey: wallet.getPublicKey() });
        }
    }
</script>

<div class="simple-signer wallet-container">
    {#await isInstalled then isInstalled}
        <div class="simple-signer wallet-items-container {isInstalled ? '' : 'wallet-opacity'}" on:click={connect}>
            <div class="simple-signer wallet-items">
                <a class="connect-wallet" href="#">
                    <img
                        alt="{wallet.getFriendlyName()} logo"
                        class="simple-signer wallet-logo"
                        height={height}
                        src={wallet.getImage()}
                        width={width}
                    />
                </a>
            </div>
            <div class="simple-signer wallet-title-container">
                <span class="simple-signer wallet-title {isInstalled ? '' : 'wallet-title-opacity'}">
                    {wallet.getFriendlyName()}
                </span>
            </div>
        </div>
        <a class="simple-signer {isInstalled ? '' : 'install-wallet'}" target="_blank" href={wallet.getExtension()}
            >{isInstalled ? '' : $language.INSTALL}</a
        >
    {/await}
</div>

<style>
    .wallet-title-container {
        display: flex;
    }
    .wallet-opacity,
    .wallet-title-opacity {
        opacity: 0.3;
    }
    .install-wallet {
        position: absolute;
        color: #2f69b7;
        text-align: center;
        line-height: 22px;
        background-color: #bbd8ff;
        width: 90px;
        height: 20px;
        margin-top: 35px;
        margin-left: 190px;
        box-shadow: 0px 3px 3px -2px;
    }
    .wallet-logo {
        margin-left: 15px;
        margin-top: 11px;
    }

    .wallet-title {
        margin-left: 15px;
        margin-top: 22px;
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
        outline: 0.1px solid #e5e5e5;
        box-shadow: 0px 6px 8px -2px;
        width: 310px;
        height: 58px;
        margin-top: 15px;
        cursor: pointer;
    }
    .wallet-container {
        display: flex;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        font-size: 14px;
    }
</style>
