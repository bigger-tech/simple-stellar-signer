<script lang="ts">
    import type { OperationComponentTypes } from './operations/OperationComponentTypes';
    import type { ITxParams, ITransactionGroup } from './ITxParams';
    import type IWallet from '../../routes/connect/ui/wallets/interfaces/IWallet';
    import { getItem } from '../../helpers/storage';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';
    import { sendSignedTx } from './transactionHelpers';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import Signatures from './Signatures.svelte';
    import WalletFactory from '../../routes/connect/ui/wallets/Wallet';
    import groupComponents from './transactionGroupHelper';
    import InvalidGroupsSortError from '../errors/InvalidGroupsSortError';
    import InsufficientOperationsError from '../errors/InsufficientOperationsError';
    import { language } from '../../store/store';
    export let txParams: ITxParams;

    let wallet: IWallet;
    const storedWallet = getItem('wallet');
    const walletFactory = new WalletFactory();

    if (storedWallet) {
        wallet = walletFactory.create(storedWallet);
    }

    let tx: Transaction;
    let operationComponents: typeof OperationComponentTypes[] = [];
    let transactionGroups: (typeof OperationComponentTypes | ITransactionGroup)[] = [];
    const isValidXdr = writable(false);

    try {
        $isValidXdr = xdr.TransactionEnvelope.validateXDR(txParams.xdr, 'base64');
        tx = new Transaction(txParams.xdr, import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE);

        const dynamicOperationComponentFactory = new DynamicOperationComponentFactory();

        for (let i = 0; i < tx.operations.length; i++) {
            let operationComponent = dynamicOperationComponentFactory.create(tx, tx.operations[i]!);
            operationComponents.push(operationComponent);
        }

        if (txParams.transactionGroups && txParams.transactionGroups.length > 0) {
            transactionGroups = groupComponents(operationComponents, txParams.transactionGroups);
        } else {
            console.log("A transaction group object wasn't provided");
            transactionGroups = operationComponents;
        }
    } catch (e) {
        console.error(e);
        if (e instanceof InvalidGroupsSortError || InsufficientOperationsError) {
            transactionGroups = operationComponents;
        }
    }
</script>

{#if $isValidXdr}
    {#if txParams.description}
        <div class="simple-signer tx-description">
            <h3>{$language.DESCRIPTION}</h3>
            <p>{txParams.description}</p>
        </div>
    {/if}

    <div class="simple-signer payment-tx">
        <h3>{$language.TRANSACTION}</h3>
        {#if wallet}
            <p class="src-account">
                {$language.SOURCE_ACCOUNT}
                {tx ? tx.source : ''}
            </p>
            <p class="sequence-number">{$language.SEQUENCE_NUMBER} {tx ? tx.sequence : ''}</p>
            <p class="time-bounds">
                {$language.TIME_BOUNDS}
                {tx
                    ? `${$language.MIN_TIME} ${tx.timeBounds?.minTime} ${$language.MAX_TIME} ${tx.timeBounds?.maxTime}`
                    : ''}
            </p>
            <p>{$language.FEE} {tx.fee}</p>

            <Signatures signatures="{tx.signatures}" />

            <div class="simple-signer operations-container">
                {#each transactionGroups as group}
                    {#if 'description' in group}
                        <div class="simple-signer operations-group">
                            <h3>{group.description}</h3>
                            {#each group.operationComponents as operation}
                                <div class="simple-signer tx-operation">
                                    <svelte:component this="{operation.component}" {...operation.props} />
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="simple-signer tx-operation">
                            <svelte:component this="{group.component}" {...group.props} />
                        </div>
                    {/if}
                {/each}
            </div>
            <button class="simple-signer sign-tx" on:click="{async () => sendSignedTx(await wallet.sign(tx))}"
                >{$language.SIGN_TRANSACTION} {storedWallet}</button
            >
        {:else}
            <p class="simple-signer user-not-connected">{$language.USER_IS_NOT_CONNECTED}</p>
            <button class="simple-signer connect-btn"><Link to="/connect">{$language.GO_TO_CONNECT}</Link></button>
        {/if}
    </div>
{:else}
    <h1>{$language.XDR_INVALID}</h1>
{/if}

<style>
    .operations-group {
        border-style: solid;
    }
</style>
