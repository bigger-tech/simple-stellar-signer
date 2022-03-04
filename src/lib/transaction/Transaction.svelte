<script lang="ts">
    import type { OperationComponentTypes } from './operations/OperationComponentTypes';
    import type IxdrInvalid from '../errors/IxdrInvalid';
    import type ITxParams from './ITxParams';
    import { getItem } from '../../helpers/storage';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import Signatures from './Signatures.svelte';
    import XBull from '../../routes/connect/ui/wallets/XBull';
    import PrivateKey from '../../routes/connect/ui/wallets/PrivateKey';
    import { sendSignedTx } from './transactionHelpers';
    export let txParams: ITxParams;

    const xBull = getItem('xbull');
    const privateKey = getItem('privateKey');

    let tx: Transaction;
    let operationComponents: typeof OperationComponentTypes[] = [];
    const isValidXdr = writable(false);

    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(txParams.xdr, 'base64');
        tx = new Transaction(txParams.xdr, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);

        const dynamicOperationComponentFactory = new DynamicOperationComponentFactory();

        for (let i = 0; i < tx.operations.length; i++) {
            let operationComponent = dynamicOperationComponentFactory.create(tx, tx.operations[i]!);
            operationComponents.push(operationComponent);
        }
    } catch (e) {
        const invalidXdr: IxdrInvalid = {
            invalidXdrError: e,
        };
        console.error(invalidXdr);
    }
</script>

{#if $isValidXdr}
    {#if txParams.description}
        <div class="simple-signer tx-description">
            <h3>Description</h3>
            <p>{txParams.description}</p>
        </div>
    {/if}

    <div class="simple-signer payment-tx">
        <h3>Transaction</h3>
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
                <button class="simple-signer sign-tx" on:click="{async () => sendSignedTx(await PrivateKey.signTx(tx))}"
                    >Sign Transaction with Private Key</button
                >
            {:else if xBull}
                <button class="simple-signer sign-tx" on:click="{async () => sendSignedTx(await XBull.signTx(tx))}"
                    >Sign Transaction with xBull</button
                >
            {/if}
        {:else}
            <p class="simple-signer user-not-connected">User is not connected</p>
            <button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
        {/if}
    </div>
{:else}
    <h1>Sorry, the XDR is invalid</h1>
{/if}
