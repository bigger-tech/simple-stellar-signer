<script lang="ts">
    import type { OperationComponentTypes } from './operations/OperationComponentTypes';
    import type ITxParams from './ITxParams';
    import type IWallet from '../../routes/connect/ui/wallets/interfaces/IWallet';
    import { getItem } from '../../helpers/storage';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';
    import { sendSignedTx } from './transactionHelpers';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import Signatures from './Signatures.svelte';
    import WalletFactory from '../../routes/connect/ui/wallets/Wallet';
    export let txParams: ITxParams;

    let wallet: IWallet;
    const storedWallet = getItem('wallet');
    const walletFactory = new WalletFactory();

    if (storedWallet) {
        wallet = walletFactory.create(storedWallet);
    }

    let tx: Transaction;
    let operationComponents: typeof OperationComponentTypes[] = [];
    let opGroup: any[] = [];
    const isValidXdr = writable(false);

    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(txParams.xdr, 'base64');
        tx = new Transaction(txParams.xdr, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);

        const dynamicOperationComponentFactory = new DynamicOperationComponentFactory();

        for (let i = 0; i < tx.operations.length; i++) {
            let operationComponent = dynamicOperationComponentFactory.create(tx, tx.operations[i]!);
            operationComponents.push(operationComponent);
        }

        if (txParams.operationsGroups.length > 0) {
            for (let i = 0; i < txParams.operationsGroups.length; i++) {
                opGroup.push({
                    description: txParams.operationsGroups[i]!.description,
                    opComponents: operationComponents.slice(
                        txParams.operationsGroups[i]!.from,
                        txParams.operationsGroups[i]!.to + 1,
                    ),
                });
            }

            operationComponents.splice(
                txParams.operationsGroups[0]!.from,
                txParams.operationsGroups[txParams.operationsGroups.length - 1]!.to + 1,
            );
        }
    } catch (e) {
        console.error(e);
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
                {#if opGroup.length > 0}
                    {#each opGroup as group}
                        <div class="simple-signer operations-group">
                            <h3>{group.description}</h3>
                            {#each group.opComponents as op}
                                <svelte:component this="{op.component}" {...op.props} />
                            {/each}
                        </div>
                    {/each}
                {/if}
                {#each operationComponents as operation}
                    <svelte:component this="{operation.component}" {...operation.props} />
                {/each}
            </div>
            <button class="simple-signer sign-tx" on:click="{async () => sendSignedTx(await wallet.sign(tx))}"
                >Sign Transaction with {storedWallet}</button
            >
        {:else}
            <p class="simple-signer user-not-connected">User is not connected</p>
            <button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
        {/if}
    </div>
{:else}
    <h1>Sorry, the XDR is invalid</h1>
{/if}
