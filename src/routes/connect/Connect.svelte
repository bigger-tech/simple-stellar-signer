<script lang="ts">
    import Albedo from './ui/wallets/Albedo';
    import Freighter from './ui/wallets/Freighter';
    import XBull from './ui/wallets/XBull';
    import PrivateKey from './ui/wallets/PrivateKey';
    import Rabet from './ui/wallets/Rabet';
    import { inputValue, isPrivateKeyVisible, isWalletHidden } from './connectStore';
    import { albedo, xBull, freighter, privateKey, rabet } from '../../assets/index';
    import { language } from '../../store/store';

    async function connectWithAlbedo() {
        const albedo = new Albedo();
        return albedo.logIn(await albedo.getPublicKey());
    }

    async function connectWithFreighter() {
        const freighter = new Freighter();
        return freighter.logIn(await freighter.getPublicKey());
    }

    async function connectWithXBull() {
        const xbull = new XBull();
        return xbull.logIn(await xbull.getPublicKey());
    }

    async function connectWithRabet() {
        const rabet = new Rabet();
        return rabet.logIn(await rabet.getPublicKey());
    }

    async function connectWithSecretKey(privateKey: string): Promise<void> {
        return new PrivateKey().logIn(privateKey);
    }
</script>

<div class="simple-signer-container">
    {#if $isWalletHidden}
        <button class="simple-signer return-btn" on:click="{() => ($isWalletHidden = !$isWalletHidden)}"
            >{$language.RETURN}</button
        >
        <button class="simple-signer show-key-btn" on:click="{() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}"
            >{$language.SHOW_KEY}</button
        >

        {#if $isPrivateKeyVisible}
            <input id="input-key" type="text" bind:value="{$inputValue}" />
        {:else}
            <input id="input-key" type="password" bind:value="{$inputValue}" />
        {/if}

        <button class="simple-signer private-key-btn" on:click="{() => connectWithSecretKey($inputValue)}">
            {$language.CONNECT_WITH_PRIVATE_KEY}
        </button>
    {:else}
        <div class="simple-signer-wallets">
            <div class="simple-signer rabet-container">
                <a href="{'#'}" class="connect-rabet" on:click="{() => connectWithRabet()}">
                    <img class="simple-signer rabet-logo" src="{rabet}" alt="rabet logo" width="35" height="45" />
                    <p class="simple-signer wallet-rabet-title">Rabet</p>
                </a>
            </div>
            <div class="simple-signer albedo-container">
                <a href="{'#'}" class="connect-albedo" on:click="{() => connectWithAlbedo()}">
                    <img class="simple-signer albedo-logo" src="{albedo}" alt="albedo logo" width="35" height="45" />
                    <p class="simple-signer wallet-albedo-title">Albedo</p>
                </a>
            </div>
            <div class="simple-signer freighter-container">
                <a href="{'#'}" class="connect-freighter" on:click="{() => connectWithFreighter()}">
                    <img
                        class="simple-signer freighter-logo"
                        src="{freighter}"
                        alt="freighter logo"
                        width="35"
                        height="45"
                    />
                    <p class="simple-signer wallet-freighter-title">Freighter</p>
                </a>
            </div>
            <div class="simple-signer xbull-container">
                <a href="{'#'}" class="connect-xbull" on:click="{() => connectWithXBull()}">
                    <img class="simple-signer xbull-logo" src="{xBull}" alt="xbull logo" width="45" height="45" />
                    <p class="simple-signer wallet-xbull-title">xBull</p>
                </a>
            </div>
            <div class="simple-signer private-key-container">
                <a href="{'#'}" class="connect-private-key" on:click="{() => ($isWalletHidden = !$isWalletHidden)}">
                    <img
                        class="simple-signer private-key-logo"
                        src="{privateKey}"
                        alt="private key logo"
                        width="45"
                        height="45"
                    />
                    <p class="simple-signer wallet-private-key-title">{$language.PRIVATE_KEY}</p>
                </a>
            </div>
        </div>
    {/if}
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
    .rabet-logo,
    .albedo-logo,
    .xbull-logo,
    .private-key-logo {
        margin-top: 25px;
    }
    .freighter-logo {
        margin-top: 28px;
    }
    .wallet-rabet-title,
    .wallet-albedo-title,
    .wallet-xbull-title,
    .wallet-private-key-title {
        margin-top: 10px;
    }

    .wallet-freighter-title {
        margin-top: 7px;
    }

    .wallet-rabet-title:hover,
    .wallet-albedo-title:hover,
    .wallet-xbull-title:hover,
    .wallet-private-key-title:hover,
    .wallet-freighter-title:hover {
        color: #000;
    }

    a {
        text-decoration: inherit;
        color: inherit;
    }
    .rabet-container,
    .albedo-container,
    .freighter-container,
    .xbull-container,
    .private-key-container {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        color: #bdbdbd;
        outline: 0.1px solid #e5e5e5;
        width: 130px;
        height: 120px;
        margin-top: 18px;
    }
    @media screen and (max-width: 291px) {
        .rabet-container,
        .albedo-container,
        .freighter-container,
        .xbull-container,
        .private-key-container {
            margin-top: 15px;
        }
    }
</style>
