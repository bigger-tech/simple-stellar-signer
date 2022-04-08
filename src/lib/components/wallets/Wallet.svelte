<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { language } from '../../../store/global';
    import type IWallet from '../../wallets/IWallet';
    import PrivateKey from '../../wallets/privateKey/PrivateKey';

    export let width = 35;
    export let height = 45;
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
    <a class="connect-wallet" href="#" on:click={connect}>
        <img
            alt="{wallet.getFriendlyName()} logo"
            class="simple-signer wallet-logo"
            height={height}
            src={wallet.getImage()}
            width={width}
        />
        {#await isInstalled then isInstalled}
            <p class="simple-signer wallet-title">
                {isInstalled ? '' : $language.INSTALL}
                {wallet.getFriendlyName()}
            </p>
        {/await}
    </a>
</div>

<style>
    .wallet-logo {
        margin-top: 25px;
    }

    .wallet-title {
        margin-top: 7px;
    }

    .wallet-title:hover {
        color: #000;
    }

    a {
        text-decoration: inherit;
        color: inherit;
    }

    .wallet-container {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        color: #bdbdbd;
        outline: 0.1px solid #e5e5e5;
        width: 130px;
        height: 120px;
        margin-top: 18px;
    }
    @media screen and (max-width: 291px) {
        .wallet-container {
            margin-top: 15px;
        }
    }
</style>
