<script lang="ts">
    import { isPrivateKeyVisible, inputValue, connectionError } from './connectStore';
    import { encryptPrivateKey, getStellarKeypair, decryptPrivatePair } from './connectHelpers';
    import { publicKey } from '../../store/store';
    import InvalidPrivateKeyError from './errors/InvalidPrivateKeyError';
    import StorageKeyNotFoundError from './errors/StorageKeyNotFoundError';
    import { sendMessage } from './sendMessageHelpers';

    async function connectWithSecretKey(key: string): Promise<void> {
        try {
            const stellarKeyPair = await getStellarKeypair(key);
            encryptPrivateKey(key);
            $publicKey = stellarKeyPair.publicKey();
            sendMessage($publicKey);
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                $publicKey = '';
                $connectionError = 'Invalid key, please try again';
            }
        }
    }

    (async function connectWithStorage(): Promise<void> {
        try {
            const privateKey = await decryptPrivatePair();
            connectWithSecretKey(privateKey);
        } catch (e) {
            if (e instanceof StorageKeyNotFoundError) {
                console.log('No key was found in storage');
            }
        }
    })();
</script>

{#if $publicKey}
    <h1 id="title">Public Key: {$publicKey}</h1>
{:else}
    <h1 id="title">Public Key: {$connectionError ? $connectionError : 'waiting connection...'}</h1>
{/if}

<button on:click="{() => ($isPrivateKeyVisible = !$isPrivateKeyVisible)}">Show key</button>

{#if $isPrivateKeyVisible}
    <input id="input-key" type="text" bind:value="{$inputValue}" />
{:else}
    <input id="input-key" type="password" bind:value="{$inputValue}" />
{/if}

<button
    on:click="{() => {
        connectWithSecretKey($inputValue);
    }}"
>
    Connect with private key
</button>
