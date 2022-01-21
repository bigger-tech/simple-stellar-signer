<script lang="ts">
    import { isVisible, inputValue } from '../stores/store';
    import { connectWithStorageData, connectWithSecretKey } from '../helpers/connect';
    import { publicKey } from '../stores/store';

    connectWithStorageData();
</script>

<h1>Connector</h1>
<ul class="simple-signer wallet-container">
    <li class="simple-signer albedo-wallet">Connect with Albedo</li>
    <li class="simple-signer xbull-wallet">Connect with xBull</li>
    <li class="simple-signer private-key-wallet">Connect with Private Key</li>
</ul>
<h1>Public Key: {$publicKey ? $publicKey : 'Waiting connection...'}</h1>
<button on:click="{() => ($isVisible = !$isVisible)}">Show key</button>

{#if !$isVisible}
    <input type="password" bind:value="{$inputValue}" />
{:else}
    <input type="text" bind:value="{$inputValue}" />
{/if}

<button
    on:click="{() => {
        connectWithSecretKey($inputValue);
    }}">Connect with private key</button
>
