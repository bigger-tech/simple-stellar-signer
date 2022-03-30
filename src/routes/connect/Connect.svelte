<script lang="ts">
    import Wallets from '../../lib/wallets/Wallets.svelte';
    import PrivateKey from '../../routes/connect/ui/wallets/PrivateKey';
    import { getWalletsFromUrl } from './connectHelpers';
    import { inputValue, isPrivateKeyVisible, isWalletHidden } from '../../routes/connect/connectStore';
    import EventsClass from '../../helpers/EventsClass';
    import { sendMessage } from '../../helpers/sendMessageHelpers';
    import DefaultWallets from '../../lib/wallets/DefaultWallets.svelte';
    const urlParams = getWalletsFromUrl();
    const parent = window.opener;
    let wallets: string[] | undefined = [];

    async function connectWithSecretKey(privateKey: string): Promise<void> {
        return new PrivateKey().logIn(privateKey);
    }

    function messageHandler(e: MessageEvent): void {
        if ('wallets' in e.data) {
            if (!e.data.wallets) {
                wallets = undefined;
            }

            if (e.data.wallets.length > 0) {
                wallets = e.data.wallets;
            } else {
                throw new Error('The wallets array is empty');
            }
        }
    }

    if (parent) {
        const readyEvent = EventsClass.onReadyEvent();
        sendMessage(readyEvent);
        window.addEventListener('message', messageHandler);
    } else if (urlParams && urlParams.length > 0) {
        wallets = urlParams;
    }
</script>

<div class="simple-signer-container">
    {#if $isWalletHidden}
        <button class="simple-signer return-btn" on:click={() => ($isWalletHidden = !$isWalletHidden)}>Return</button>
        <button class="simple-signer show-key-btn" on:click={() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}>
            Show key
        </button>

        {#if $isPrivateKeyVisible}
            <input id="input-key" type="text" bind:value={$inputValue} />
        {:else}
            <input id="input-key" type="password" bind:value={$inputValue} />
        {/if}

        <button class="simple-signer private-key-btn" on:click={() => connectWithSecretKey($inputValue)}>
            Connect with private key
        </button>
    {:else}
        <div class="simple-signer-wallets">
            {#if parent || urlParams.length > 0}
                {#if wallets && wallets.length > 0}
                    <Wallets wallets={wallets} />
                {/if}
                {#if !wallets}
                    <DefaultWallets />
                {/if}
            {:else}
                <DefaultWallets />
            {/if}
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
</style>
