<script lang="ts">
    import WalletFactory from './ui/wallets/Wallet';
    import PrivateKey from './ui/wallets/PrivateKey';
    import { inputValue, isPrivateKeyVisible, isWalletHidden } from './connectStore';
    const walletsString = ['xbull', 'albedo', 'rabet', 'freighter', 'privateKey'];
    const walletFactory = new WalletFactory();

    // function togglePrivateKeyInput() {
    //     $isWalletHidden = !$isWalletHidden;
    // }

    async function connectWithSecretKey(privateKey: string): Promise<void> {
        return new PrivateKey().logIn(privateKey);
    }

    let wallets: any[] = [];

    for (let i = 0; i < walletsString.length; i++) {
        wallets.push(walletFactory.create(walletsString[i]!).getConnectObject());
    }

    console.log(wallets);
</script>

<div class="simple-signer-container">
    {#if $isWalletHidden}
        <button class="simple-signer return-btn" on:click="{() => ($isWalletHidden = !$isWalletHidden)}">Return</button>
        <button class="simple-signer show-key-btn" on:click="{() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}">
            Show key
        </button>

        {#if $isPrivateKeyVisible}
            <input id="input-key" type="text" bind:value="{$inputValue}" />
        {:else}
            <input id="input-key" type="password" bind:value="{$inputValue}" />
        {/if}

        <button class="simple-signer private-key-btn" on:click="{() => connectWithSecretKey($inputValue)}">
            Connect with private key
        </button>
    {:else}
        {#await wallets then wallets}
            <div class="simple-signer-wallets">
                {#each wallets as wallet}
                    <div class="simple-signer wallet-container">
                        <a href="{'#'}" class="connect-wallet" on:click="{() => wallet.connectMethod()}">
                            <img
                                class="simple-signer wallet-logo"
                                src="{wallet.img}"
                                alt="{wallet.name} logo"
                                width="{wallet.width}"
                                height="{wallet.height}"
                            />
                            <p class="simple-signer wallet-title">{wallet.name}</p>
                        </a>
                    </div>
                {/each}
            </div>
        {/await}
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
