<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { privateKey, visibilityOff, visibilityOn } from '../../../assets';
    import { language } from '../../../store/global';
    import { removeDuplicates } from '../../utils/utils';
    import type IWallet from '../../wallets/IWallet';
    import WalletFactory from '../../wallets/WalletFactory';
    import PrivateKey from '../../wallets/privateKey/PrivateKey';
    import Wallet from './Wallet.svelte';
    import { inputValue, isPrivateKeyFormVisible, isPrivateKeyInvalid, isPrivateKeyVisible } from './walletsStore';

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
        validateInputPrivateKey(privateKey);
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

    function validateInputPrivateKey(privateKey: string) {
        const privateKeyRegEx = /^S[A-Za-z0-9]{55}$/;
        if (!privateKeyRegEx.test(privateKey)) {
            $isPrivateKeyInvalid = true;
        }
    }

    function dispatchOnConnectEvent(wallet: IWallet, publicKey: string): void {
        dispatch('connect', {
            wallet,
            publicKey,
        });
    }

    function clearPrivateKeyInput() {
        $isPrivateKeyFormVisible = !$isPrivateKeyFormVisible;
        $inputValue = '';
    }
</script>

{#if $isPrivateKeyFormVisible}
    <div class="simple-signer private-key-form">
        <div class="simple-signer form-items">
            <div class="simple-signer header-form">
                <img alt="private-key logo" class="simple-signer wallet-logo private-key" src={privateKey} />
                <span class="private-key-title">{PrivateKey.FRIENDLY_NAME}</span>
            </div>
            <div class="simple-signer input-form">
                {#if $isPrivateKeyVisible}
                    <input
                        class="simple-signer input-private-key {$isPrivateKeyInvalid ? 'invalid-key' : ''}"
                        id="input-key"
                        type="text"
                        bind:value={$inputValue}
                        placeholder="Input key here"
                    />
                {:else}
                    <input
                        class="simple-signer input-private-key {$isPrivateKeyInvalid ? 'invalid-key' : ''}"
                        id="input-key"
                        type="password"
                        bind:value={$inputValue}
                        placeholder="Input key here"
                    />
                {/if}
                <button
                    class="simple-signer visibility-key-btn"
                    on:click={() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}
                    ><img
                        alt={$isPrivateKeyVisible ? 'visibility off' : 'visibility on'}
                        src={$isPrivateKeyVisible ? visibilityOff : visibilityOn}
                    /></button
                >
            </div>

            <div class="simple-signer btn-form">
                <button class="simple-signer cancel-btn" on:click={() => clearPrivateKeyInput()}
                    >{$language.CANCEL}</button
                >
                <button class="simple-signer connect-btn" on:click={() => connectWithPrivateKey($inputValue)}>
                    {$language.CONNECT_WITH_PRIVATE_KEY}
                </button>
            </div>
            {#if $isPrivateKeyInvalid}
                <span class="simple-signer error-private-key">{$language.INVALID_KEY}</span>
            {/if}
        </div>
    </div>
{:else}
    {#each filteredWallets as wallet}
        <Wallet wallet={wallet} on:connect={handleWalletConnect} />
    {/each}
{/if}

<style>
    .error-private-key {
        position: absolute;
        color: #ff6565;
        font-weight: 300;
        margin-top: 122px;
        margin-left: 10px;
    }
    .input-form {
        margin-top: 50px;
        margin-bottom: 30px;
        margin-left: 10px;
        display: flex;
    }
    .btn-form {
        height: 39px;
        margin-left: 10px;
        margin-bottom: 20px;
    }
    .private-key-title {
        color: #000000;
        margin-left: 18px;
    }
    .header-form {
        display: flex;
        margin-top: 21px;
        margin-left: 10px;
        width: 100%;
        align-items: center;
    }
    .form-items {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 310px;
    }
    .private-key {
        width: 30px;
    }
    .input-private-key {
        width: 240px;
        height: 36px;
        opacity: 50%;
        font-size: 16px;
        border: 1px solid #e5e5e5;
        text-indent: 10px;
        font-family: 'Roboto', sans-serif;
    }
    .invalid-key {
        outline: none;
        border-color: #ff6565;
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
        font-weight: 500;
        font-size: 14px;
        color: #bdbdbd;
        outline: 0.1px solid #e5e5e5;
        box-shadow: 0px 6px 8px -2px;
        width: 310px;
    }
    .visibility-key-btn {
        height: 38px;
        box-shadow: 0px 2px 1px #00000029;
        border: 1px solid #e5e5e5;
        margin-left: 5px;
        cursor: pointer;
    }

    .connect-btn,
    .cancel-btn {
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-weight: bold;
        box-shadow: 0px 4px 2px #00000029;
        width: 140px;
        height: 100%;
        border: none;
        cursor: pointer;
    }

    .connect-btn {
        color: white;
        background: #2f69b7 0% 0% no-repeat padding-box;
        margin-left: 2.5px;
    }
    .cancel-btn {
        color: #000000;
        margin-right: 2.5px;
    }
</style>
