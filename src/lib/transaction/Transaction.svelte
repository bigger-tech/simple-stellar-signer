<script lang="ts">
    import type { OperationComponentTypes } from './operations/OperationComponentTypes';
    import { getItem } from '../../helpers/storage';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import Signatures from './Signatures.svelte';
    import sendMessage from '../../helpers/sendMessageHelpers';
    import type IWallet from '../../routes/connect/ui/wallets/interfaces/IWallet';
    import WalletFactory from '../../routes/connect/ui/wallets/Wallet';

    let wallet: IWallet;
    const storedWallet = getItem('wallet');
    const walletFactory = new WalletFactory();

    if (storedWallet) {
        wallet = walletFactory.create(storedWallet);
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
        {#if wallet}
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
            <button
                class="simple-signer sign-tx"
                on:click="{async () => wallet.sign(tx).then((signedXDR) => sendMessage(signedXDR))}"
                >Sign Transaction with {storedWallet}</button
            >
        {:else}
            <p class="simple-signer user-not-connected">User is not connected</p>
            <button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
        {/if}
    </div>
{:else}
    <h1>INVALID OR NULL XDR</h1>
{/if}
