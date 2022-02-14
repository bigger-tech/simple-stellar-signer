<script lang="ts">
    import type { Keypair } from 'stellar-sdk';
    import type { OperationComponentTypes } from './operations/OperationComponentTypes';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { signTx } from '../../routes/sign/signHelper';
    import { Link } from 'svelte-navigator';
    import { getStoredPair } from '../../helpers/keyManager';
    import { decryptPrivateKey } from '../../helpers/security';
    import { getStellarKeypair } from '../../routes/connect/connectHelpers';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import Signatures from './Signatures.svelte';

    async function getKeyPair(): Promise<Keypair> {
        const storedPair = getStoredPair();
        const privateKey = await decryptPrivateKey(storedPair.privateKey, storedPair.cryptoKey);
        const keyPair = await getStellarKeypair(privateKey);
        return keyPair;
    }
    const keyPair = getKeyPair();

    let tx: Transaction;
    let operationComponents: typeof OperationComponentTypes[] = [];
    const isValidXdr = writable(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const xdrValue = urlParams.get('xdr')?.replace(/\s/g, '+');
    const description = urlParams.get('description');

    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(xdrValue!, 'base64');
        tx = new Transaction(xdrValue!, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);

        const dynamicOperationComponentFactory = new DynamicOperationComponentFactory();

        for (let i = 0; i < tx.operations.length; i++) {
            let operationComponent = dynamicOperationComponentFactory.create(tx, tx.operations[i]!);
            operationComponents.push(operationComponent);
        }
    } catch (e) {
        console.error({ invalidUrl: e });
    }
</script>

{#if $isValidXdr}
    <div class="simple-signer payment-tx">
        {#await keyPair then data}
            {#if description}
                <div class="simple-signer tx-description">
                    <p>{description}</p>
                </div>
            {/if}
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

            <button class="simple-signer sign-tx" on:click="{() => signTx(tx, data)}">Sign Transaction</button>
        {:catch}
            <p class="simple-signer user-not-connected">User is not connected</p>
            <button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
        {/await}
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
