<script lang="ts">
    import { isPrivateKeyVisible, inputValue, connectionError } from './connectStores';
    import { setPrivateKey } from './connectHelpers';
    import { decryptPrivateKey } from '../../helpers/security';
    import { publicKey } from '../../stores/store';
    import { getStorageData } from '../../helpers/storage';
    import StorageKeyNotFoundError from './errors/StorageKeyNotFoundError';

    try {
        const storageKeys = getStorageData();
        (async () => {
            const decryptedKey = await decryptPrivateKey(storageKeys.privateKey, storageKeys.cryptoKey);
            setPrivateKey(decryptedKey);
        })();
    } catch (e) {
        if (e instanceof StorageKeyNotFoundError) {
            console.log('Key was not found in Storage');
        }
    }
</script>

<h1>Connector</h1>
<ul class="simple-signer wallet-container">
    <li class="simple-signer albedo-wallet">Connect with Albedo</li>
    <li class="simple-signer xbull-wallet">Connect with xBull</li>
    <li class="simple-signer private-key-wallet">Connect with Private Key</li>
</ul>
<h1>Public Key: {$publicKey ? $publicKey : $connectionError}</h1>
<button on:click="{() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}">Show key</button>

{#if $isPrivateKeyVisible}
    <input type="text" bind:value="{$inputValue}" />
{:else}
    <input type="password" bind:value="{$inputValue}" />
{/if}

<button
    on:click="{() => {
        setPrivateKey($inputValue);
    }}">Connect with private key</button
>
