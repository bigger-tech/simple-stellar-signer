<script lang="ts">
    import type { OperationComponentTypes } from './operations/OperationComponentTypes';
    import type ITxParams from './ITxParams';
    // import type IWallet from '../../routes/connect/ui/wallets/interfaces/IWallet';
    // import { getItem } from '../../helpers/storage';
    import { writable } from 'svelte/store';
    import { Transaction, xdr } from 'stellar-sdk';
    // import { Link } from 'svelte-navigator';
    // import { sendSignedTx } from './transactionHelpers';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    // import Signatures from './Signatures.svelte';
    // import WalletFactory from '../../routes/connect/ui/wallets/Wallet';
    export let txParams: ITxParams;

    // let wallet: IWallet;
    // const storedWallet = getItem('wallet');
    // const walletFactory = new WalletFactory();

    // if (storedWallet) {
    //     wallet = walletFactory.create(storedWallet);
    // }

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
        <p class="src-account">
            Source account: {tx ? tx.source : ''}
        </p>
        <p class="sequence-number">Sequence number: {tx ? tx.sequence : ''}</p>
        <p class="time-bounds">
            Time bounds: {tx ? `Min time ${tx.timeBounds?.minTime} Max time ${tx.timeBounds?.maxTime}` : ''}
        </p>

        <div class="simple-signer operations-container">
            {#each operationComponents as operation}
                <svelte:component this="{operation.component}" {...operation.props} />
            {/each}
        </div>
    </div>
{:else}
    <h1 class="test-cypress">Sorry, the XDR is invalid</h1>
{/if}
