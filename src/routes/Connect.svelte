<script lang="ts">
    const toggleVisibility = () => {
        const input = <HTMLInputElement>document.querySelector('#secret-key-input');
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    };
</script>

<h1>Connector</h1>
<ul class="simple-signer wallet-container">
    <li class="simple-signer albedo-wallet">Connect with Albedo</li>
    <li class="simple-signer xbull-wallet">Connect with xBull</li>
    <li class="simple-signer private-key-wallet">Connect with Private Key</li>
</ul>
<button on:click="{toggleVisibility}">Show key</button>
<input id="secret-key-input" type="password" />
<button>Connect with private key</button>
