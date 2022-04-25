<script lang="ts">
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';

    import { language } from '../../../store/global';
    import Bridge from '../../bridge/Bridge';
    import type { ITransactionMessage } from '../../bridge/transactionMessage/ITransactionMessage';
    import { CURRENT_NETWORK_PASSPHRASE } from '../../stellar/StellarNetwork';
    import LocalStorage from '../../storage/storage';
    import type IWallet from '../../wallets/IWallet';
    import WalletFactory from '../../wallets/WalletFactory';
    import type { IOperationComponentGroup } from './IOperationComponentGroup';
    import Signatures from './Signatures.svelte';
    import InsufficientOperationsError from './errors/InsufficientOperationsError';
    import InvalidGroupsSortError from './errors/InvalidGroupsSortError';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import type { OperationComponent } from './operations/OperationComponent';
    import groupOperationComponents from './transactionGroupHelper';
    import signedXDR from './transactionStore';

    export let transactionMessage: ITransactionMessage;

    const storage = new LocalStorage();
    const bridge = new Bridge();

    let wallet: IWallet;
    const storedWallet = storage.getItem('wallet');
    const walletFactory = new WalletFactory();

    if (storedWallet) {
        wallet = walletFactory.create(storedWallet);
    }

    let tx: Transaction;

    let operationComponents: OperationComponent[] = [];
    let transactionGroups: (OperationComponent | IOperationComponentGroup)[] = [];
    let isValidXdr = false;

    try {
        isValidXdr = xdr.TransactionEnvelope.validateXDR(transactionMessage.xdr, 'base64');
        tx = new Transaction(transactionMessage.xdr, CURRENT_NETWORK_PASSPHRASE);

        const dynamicOperationComponentFactory = new DynamicOperationComponentFactory();

        operationComponents = tx.operations.map((operation) => dynamicOperationComponentFactory.create(tx, operation));

        if (transactionMessage.operationGroups && transactionMessage.operationGroups.length > 0) {
            transactionGroups = groupOperationComponents(operationComponents, transactionMessage.operationGroups);
        } else {
            console.info("A transaction group object wasn't provided");
            transactionGroups = operationComponents;
        }
    } catch (e) {
        console.error(e);
        if (e instanceof InvalidGroupsSortError || InsufficientOperationsError) {
            transactionGroups = operationComponents;
        }
    }
    $: if ($signedXDR) {
        bridge.sendSignedTx($signedXDR);
    }
</script>

{#if isValidXdr}
    <div class="simple-signer tx-container">
        {#if transactionMessage.description}
            <div class="simple-signer tx-description-container">
                <h3>{$language.DESCRIPTION}</h3>
                <p>{transactionMessage.description}</p>
            </div>
        {/if}

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

            <Signatures signatures={tx.signatures} />

            <div class="simple-signer operations-container">
                {#each transactionGroups as group}
                    {#if 'description' in group}
                        <div class="simple-signer operations-group-container">
                            <h3 class="simple-signer operations-group-title">{group.description}</h3>
                            {#each group.operationComponents as operation}
                                <div class="simple-signer tx-operation-container">
                                    <svelte:component this={operation.component} {...operation.props} />
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="simple-signer tx-operation-container">
                            <svelte:component this={group.component} {...group.props} />
                        </div>
                    {/if}
                {/each}
            </div>

            <button class="simple-signer sign-tx" on:click={async () => bridge.sendSignedTx(await wallet.sign(tx))}
                >{$language.SIGN_TRANSACTION} {storedWallet}</button
            >
        {:else}
            <p class="simple-signer user-not-connected">{$language.USER_IS_NOT_CONNECTED}</p>
            <button class="simple-signer connect-btn">
                <Link to="/connect">{$language.GO_TO_CONNECT}</Link>
            </button>
        {/if}
    </div>
{:else}
    <h1>{$language.XDR_INVALID}</h1>
{/if}

<style>
    .operations-group-container {
        border-style: solid;
    }
</style>
