<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { privateKey, visibilityOff, visibilityOn } from '../../../assets';
    import { language } from '../../../store/global';
    import { removeDuplicates } from '../../utils/utils';
    import type IWallet from '../../wallets/IWallet';
    import WalletFactory from '../../wallets/WalletFactory';
    import PrivateKey from '../../wallets/privateKey/PrivateKey';
    import Wallet from './Wallet.svelte';
    import { inputValue, isPrivateKeyFormVisible, isPrivateKeyVisible } from './walletsStore';

    export let wallets: string[];
    const walletFactory = new WalletFactory();
    const dispatch = createEventDispatcher();

    let filteredWallets: IWallet[];
    if (wallets.length) {
        filteredWallets = removeDuplicates(wallets).map(walletFactory.create);
    } else {
        filteredWallets = walletFactory.createAll();
    }

    async function connectWithPrivateKey(privateKey: string): Promise<void> {
        const wallet = walletFactory.create(PrivateKey.NAME);
        const publicKey = await wallet.getPublicKey(privateKey);
        dispatchOnConnectEvent(wallet, publicKey);
    }

    async function handleWalletConnect(event: CustomEvent): Promise<void> {
        const wallet: IWallet = event.detail.wallet;
        if (wallet.getName() === PrivateKey.NAME) {
            $isPrivateKeyFormVisible = true;
        } else {
            const publicKey = await wallet.getPublicKey();
            dispatchOnConnectEvent(wallet, publicKey);
        }
    }

    function dispatchOnConnectEvent(wallet: IWallet, publicKey: string): void {
        dispatch('connect', {
            wallet,
            publicKey,
        });
    }
</script>

{#if $isPrivateKeyFormVisible}
    <form>
        <div class="simple-signer private-key-form">
            <div class="simple-signer form-items">
                <div class="simple-signer header-form">
                    <img alt="private-key logo" class="simple-signer wallet-logo private-key" src={privateKey} />
                    <span class="private-key-title">{PrivateKey.FRIENDLY_NAME}</span>
                </div>
                <div class="simple-signer input-form">
                    {#if $isPrivateKeyVisible}
                        <input
                            class="simple-signer input-private-key"
                            id="input-key"
                            type="text"
                            bind:value={$inputValue}
                            placeholder="Input key here"
                        />
                    {:else}
                        <input
                            class="simple-signer input-private-key"
                            id="input-key"
                            type="password"
                            bind:value={$inputValue}
                            placeholder="Input key here"
                        />
                    {/if}
                </div>
                <button
                    class="simple-signer visibility-key-btn"
                    on:click={() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}
                    ><img
                        alt={$isPrivateKeyVisible ? 'visibility off' : 'visibility on'}
                        src={$isPrivateKeyVisible ? visibilityOff : visibilityOn}
                    /></button
                >
                <div class="simple-signer btn-form">
                    <button
                        class="simple-signer cancel-btn"
                        on:click={() => ($isPrivateKeyFormVisible = !$isPrivateKeyFormVisible)}
                        >{$language.CANCEL}</button
                    >
                    <button class="simple-signer connect-btn" on:click={() => connectWithPrivateKey($inputValue)}>
                        {$language.CONNECT_WITH_PRIVATE_KEY}
                    </button>
                </div>
            </div>
        </div>
    </form>
{:else}
    {#each filteredWallets as wallet}
        <Wallet wallet={wallet} on:connect={handleWalletConnect} />
    {/each}
{/if}

<style>
    .input-form {
        margin-top: 30px;
        margin-left: 10px;
    }
    .btn-form {
        margin-top: 35px;
        margin-left: 10px;
    }
    .private-key-title {
        color: #000000;
        margin-left: 18px;
    }
    .header-form {
        display: flex;
        align-items: center;
        margin-top: 21px;
        margin-left: 10px;
    }
    .form-items {
        display: flex;
        flex-wrap: wrap;
        width: 310px;
        height: 66px;
    }
    .private-key {
        width: 30px;
    }
    .input-private-key {
        width: 240px;
        height: 36px;
        border: 1px solid #e5e5e5;
    }
    .input-private-key:focus::placeholder {
        color: transparent;
    }
    .input-private-key:focus {
        outline: none;
        border-color: #484848;
    }
    .private-key-form {
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: #bdbdbd;
        outline: 0.1px solid #e5e5e5;
        box-shadow: 0px 6px 8px -2px;
        width: 310px;
        height: 215px;
        margin-top: 15px;
    }
    .visibility-key-btn {
        height: 40px;
        box-shadow: 0px 2px 1px #00000029;
        border: 1px solid #e5e5e5;
        margin-left: 5px;
        margin-top: 30px;
        cursor: pointer;
    }
    .connect-btn {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        color: white;
        background: #2f69b7 0% 0% no-repeat padding-box;
        box-shadow: 0px 4px 2px #00000029;
        width: 145px;
        height: 39px;
        border: 1px solid #e5e5e5;
        cursor: pointer;
    }
    .cancel-btn {
        font-family: 'Roboto', sans-serif;
        color: #000000;
        font-weight: bold;
        box-shadow: 0px 4px 2px #00000029;
        width: 142px;
        height: 39px;
        border: 1px solid #e5e5e5;
        cursor: pointer;
    }
</style>
