<script lang="ts">
    import type { Keypair } from 'stellar-sdk';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { signTx } from '../routes/sign/signHelper';
    import { Link } from 'svelte-navigator';
    import { getStoredPair } from '../helpers/keyManager';
    import { decryptPrivateKey } from '../helpers/security';
    import { getStellarKeypair } from '../routes/connect/connectHelpers';

    async function getKeyPair(): Promise<Keypair> {
        const storedPair = getStoredPair();
        const privateKey = await decryptPrivateKey(storedPair.privateKey, storedPair.cryptoKey);
        const keyPair = await getStellarKeypair(privateKey);
        return keyPair;
    }

    const keyPair = getKeyPair();

    let tx: Transaction;
    const isValidXdr = writable(false);
    const xdrValue = location.search.substring(5);

    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(xdrValue, 'base64');
        tx = new Transaction(xdrValue, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);
    } catch (error) {
        console.error(error);
    }
</script>

{#if $isValidXdr}
    <div class="simple-signer payment-tx">
        {#await keyPair then data}
            <p class="src-account">
                Source account: {tx ? tx.source : ''}
            </p>
            <p class="sequence-number">Sequence number: {tx ? tx.sequence : ''}</p>
            <p class="time-bounds">
                Time bounds: {tx ? `Min time ${tx.timeBounds?.minTime} Max time ${tx.timeBounds?.maxTime}` : ''}
            </p>
            <p class="operations">Operations: {tx ? JSON.stringify(tx.operations) : ''}</p>
            <button class="simple-signer sign-tx" on:click="{() => signTx(tx, data)}">Sign Transaction</button>
        {:catch}
            <p class="simple-signer user-not-connected">User is not connected</p>
            <button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
        {/await}
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
