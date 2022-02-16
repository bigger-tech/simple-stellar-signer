<script lang="ts">
    import type { Keypair } from 'stellar-sdk';
    import type { OperationComponentTypes } from './operations/OperationComponentTypes';
    import { getItem } from '../../helpers/storage';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';
    import { getStoredPair } from '../../helpers/keyManager';
    import { decryptPrivateKey } from '../../helpers/security';
    import { getStellarKeypair } from '../../routes/connect/connectHelpers';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import Signatures from './Signatures.svelte';

    import sendMessage from '../../helpers/sendMessageHelpers';
    import XBull from '../../routes/connect/ui/wallets/XBull';
    import PrivateKey from '../../routes/connect/ui/wallets/PrivateKey';

    let keyPair: Promise<Keypair>;
    const xBull = getItem('xbull');
    const privateKey = getItem('privateKey');

    async function getKeyPair(): Promise<Keypair> {
        const storedPair = getStoredPair();
        const privateKey = await decryptPrivateKey(storedPair.privateKey, storedPair.cryptoKey);
        const keyPair = await getStellarKeypair(privateKey);
        return keyPair;
    }

    if (privateKey) {
        keyPair = getKeyPair();
    }

    let tx: Transaction;
    let operationComponents: typeof OperationComponentTypes[] = [];

    const isValidXdr = writable(false);
    const xdrValue = location.search.substring(5);

    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(xdrValue, 'base64');
        tx = new Transaction(xdrValue, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);

        const dynamicOperationComponentFactory = new DynamicOperationComponentFactory();

        for (let i = 0; i < tx.operations.length; i++) {
            let operationComponent = dynamicOperationComponentFactory.create(tx, tx.operations[i]!);
            operationComponents.push(operationComponent);
        }
    } catch (error) {
        console.error(error);
    }
</script>

{#if $isValidXdr}
    <div class="simple-signer payment-tx">
        {#if xBull || privateKey}
            <p class="src-account">
                Source account: {tx ? tx.source : ''}
            </p>
            <p class="sequence-number">Sequence number: {tx ? tx.sequence : ''}</p>
            <p class="time-bounds">
                Time bounds: {tx ? `Min time ${tx.timeBounds?.minTime} Max time ${tx.timeBounds?.maxTime}` : ''}
            </p>
            <p>Fee: {tx.fee}</p>
            <Signatures signatures="{tx.signatures}" />

            <div class="simple-signer operations-container">
                {#each operationComponents as operation}
                    <svelte:component this="{operation.component}" {...operation.props} />
                {/each}
            </div>

            {#if privateKey}
                <button
                    class="simple-signer sign-tx"
                    on:click="{async () =>
                        new PrivateKey().signTx(tx, await keyPair).then((signedXDR) => sendMessage(signedXDR))}"
                    >Sign Transaction with Private Key</button
                >
            {:else if xBull}
                <button
                    class="simple-signer sign-tx"
                    on:click="{async () => new XBull().signTx(tx).then((signedXDR) => sendMessage(signedXDR))}"
                    >Sign Transaction with xBull</button
                >
            {/if}
        {:else}
            <p class="simple-signer user-not-connected">User is not connected</p>
            <button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
        {/if}
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
