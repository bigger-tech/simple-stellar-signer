<script lang="ts">
    import type { Keypair } from 'stellar-sdk';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { signTx } from '../../routes/sign/signHelper';
    import { Link } from 'svelte-navigator';
    import { getStoredPair } from '../../helpers/keyManager';
    import { decryptPrivateKey } from '../../helpers/security';
    import { getStellarKeypair } from '../../routes/connect/connectHelpers';
    import OperationFactory from './operations/OperationFactory';

    async function getKeyPair(): Promise<Keypair> {
        const storedPair = getStoredPair();
        const privateKey = await decryptPrivateKey(storedPair.privateKey, storedPair.cryptoKey);
        const keyPair = await getStellarKeypair(privateKey);
        return keyPair;
    }

    const keyPair = getKeyPair();

    let tx: Transaction;
    let operationsArray: any[] = [];

    const isValidXdr = writable(false);
    const xdrValue = location.search.substring(5);

    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(xdrValue, 'base64');
        tx = new Transaction(xdrValue, 'Test SDF Network ; September 2015');

        for (let i = 0; i < tx.operations.length; i++) {
            const component = new OperationFactory(tx, tx.operations[i]!).createOperation()?.component;
            const props = new OperationFactory(tx, tx.operations[i]!).createOperation()?.props;
            const operation = { component, props };

            operationsArray.push(operation);
        }
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
            <p>Fee: {tx.fee}</p>

            {#each operationsArray as { component, props }}
                <svelte:component this={component} {...props} />
            {/each}

            <button class="simple-signer sign-tx" on:click={() => signTx(tx, data)}>Sign Transaction</button>
        {:catch}
            <p class="simple-signer user-not-connected">User is not connected</p>
            <button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
        {/await}
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
