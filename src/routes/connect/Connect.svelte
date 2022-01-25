<script lang="ts">
    import { isPrivateKeyVisible, setInputValue, setConnectionError } from './connectStore';
    import { getStoredKey, getStellarKeypair, storeKey } from './connectHelpers';
    import { publicKey } from '../../stores/store';
    import InvalidPrivateKeyError from './errors/InvalidPrivateKeyError';
    import StorageKeyNotFoundError from './errors/StorageKeyNotFoundError';

    (async function connectWithStorage(): Promise<void> {
        try {
            const privateKey = await getStoredKey();
            connectWithSecretKey(privateKey);
        } catch (e) {
            if (e instanceof StorageKeyNotFoundError) {
                console.log('No key was found in storage');
            }
        }
    })();

    async function connectWithSecretKey(key: string): Promise<void> {
        try {
            const stellarKeyPair = await getStellarKeypair(key);
            storeKey(key);
            $publicKey = stellarKeyPair.publicKey();
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                $setConnectionError = 'Invalid key, please try again';
            }
        }
    }
</script>

<h1>Connector</h1>
<ul class="simple-signer wallet-container">
    <li class="simple-signer albedo-wallet">Connect with Albedo</li>
    <li class="simple-signer xbull-wallet">Connect with xBull</li>
    <li class="simple-signer private-key-wallet">Connect with Private Key</li>
</ul>

{#if $publicKey}
    <h1>Public Key: {$publicKey}</h1>
{:else}
    <h1>Public Key: {$setConnectionError ? $setConnectionError : 'waiting connection...'}</h1>
{/if}

<button on:click="{() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}">Show key</button>

{#if $isPrivateKeyVisible}
    <input type="text" bind:value="{$setInputValue}" />
{:else}
    <input type="password" bind:value="{$setInputValue}" />
{/if}

<button
    on:click="{() => {
        connectWithSecretKey($setInputValue);
    }}"
>
    Connect with private key
</button>
