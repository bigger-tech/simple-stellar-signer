<script lang="ts">
    import { visibility } from '../stores/store';
    import { initConnect, decryptPk } from '../utils/connect';
    import { publicKey } from '../stores/store';
</script>

<h1>Connector</h1>
<ul class="simple-signer wallet-container">
    <li class="simple-signer albedo-wallet">Connect with Albedo</li>
    <li class="simple-signer xbull-wallet">Connect with xBull</li>
    <li class="simple-signer private-key-wallet">Connect with Private Key</li>
</ul>
<h1 id="public-key-title">Public Key: {$publicKey}</h1>
<button on:click="{() => ($visibility = !$visibility)}">Show key</button>
<input
    id="secret-key-input"
    type="{$visibility ? 'text' : 'password'}"
    value="{import.meta.env.VITE_TEST_PRIVATEKEY}"
/>
<button on:click="{initConnect}">Connect with private key</button>
<button on:click="{decryptPk}">Decrypt PK</button>
