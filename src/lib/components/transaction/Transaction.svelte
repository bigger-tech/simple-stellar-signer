<script lang="ts">
    import type { ITransactionMessage } from '../../bridge/transactionMessage/ITransactionMessage';
    import type IWallet from '../../wallets/IWallet';
    import type { IOperationComponentGroup } from './IOperationComponentGroup';
    import type { OperationComponent } from './operations/OperationComponent';
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';
    import { language } from '../../../store/global';
    import { CURRENT_NETWORK_PASSPHRASE } from '../../stellar/StellarNetwork';
    import Bridge from '../../bridge/Bridge';
    import LocalStorage from '../../storage/storage';
    import WalletFactory from '../../wallets/WalletFactory';
    import Signatures from './Signatures.svelte';
    import InsufficientOperationsError from './errors/InsufficientOperationsError';
    import InvalidGroupsSortError from './errors/InvalidGroupsSortError';
    import DynamicOperationComponentFactory from './operations/DynamicOperationComponentFactory';
    import groupOperationComponents from './transactionGroupHelper';
    import { getShortedStellarKey } from './transactionHelper';

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
    let shortedSourceAccount: string;
    let isValidXdr = false;

    try {
        isValidXdr = xdr.TransactionEnvelope.validateXDR(transactionMessage.xdr, 'base64');
        tx = new Transaction(transactionMessage.xdr, CURRENT_NETWORK_PASSPHRASE);
        shortedSourceAccount = getShortedStellarKey(tx.source);
        const dynamicOperationComponentFactory = new DynamicOperationComponentFactory();

        operationComponents = tx.operations.map((operation) =>
            dynamicOperationComponentFactory.create($language, tx, operation),
        );

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
</script>

{#if isValidXdr}
    <div class="simple-signer sign-container">
        <div class="simple-signer tx-container">
            <h1 class="simple-signer tx-title">{$language.SIGN}</h1>
            {#if transactionMessage.description}
                <div class="simple-signer tx-description-container">
                    <p class="simple-signer tx-description-text">{transactionMessage.description}</p>
                </div>
            {/if}
            {#if wallet}
                <div class="simple-signer tx-data-container">
                    <div class="simple-signer tx-network-container">
                        <p>Network:</p>
                        &nbsp;
                        <p class="simple-signer tx-network-text">Testnet</p>
                    </div>
                    <p class="sequence-number">{$language.SEQUENCE_NUMBER} {tx ? tx.sequence : ''}</p>
                    <p class="simple-signer source-account">
                        {$language.SOURCE_ACCOUNT}
                        {shortedSourceAccount}
                    </p>
                </div>
                <Signatures signatures={tx.signatures} />
                <hr class="simple-signer tx-separator" />
                <div class="simple-signer operations-container">
                    <h1 class="simple-signer tx-operation-list-title">Lista de Operaciones</h1>
                    <div class="simple-signer operation-list-container">
                        <ol class="simple-signer operation-list">
                            {#each transactionGroups as group}
                                {#if 'description' in group}
                                    <li>
                                        <div class="simple-signer operations-group-container">
                                            <h3 class="simple-signer operations-group-title">{group.description}</h3>
                                            {#each group.operationComponents as operation}
                                                <div class="simple-signer tx-operation-container">
                                                    <svelte:component this={operation.component} {...operation.props} />
                                                </div>
                                            {/each}
                                        </div>
                                    </li>
                                {:else}
                                    <li>
                                        <div class="simple-signer tx-operation-container">
                                            <svelte:component this={group.component} {...group.props} />
                                        </div>
                                    </li>
                                {/if}
                            {/each}
                        </ol>
                    </div>
                </div>
                <hr class="simple-signer tx-separator" />
                <div class="simple-signer operation-info tx-fee-container">
                    <p class="simple-signer operation-info-title">{$language.FEE}</p>
                    &nbsp;
                    <p>{tx.fee}</p>
                </div>
                <div class="simple-signer confirmation-buttons">
                    <button
                        class="simple-signer cancel-button"
                        on:click={async () => bridge.sendSignedTx(await wallet.sign(tx))}>Confirm</button
                    >
                    <button
                        class="simple-signer sign-tx-button"
                        on:click={async () => bridge.sendSignedTx(await wallet.sign(tx))}>Confirm</button
                    >
                </div>
            {:else}
                <p class="simple-signer user-not-connected">{$language.USER_IS_NOT_CONNECTED}</p>
                <button class="simple-signer connect-btn">
                    <Link to="/connect">{$language.GO_TO_CONNECT}</Link>
                </button>
            {/if}
        </div>
    </div>
{:else}
    <h1>{$language.XDR_INVALID}</h1>
{/if}

<style>
    hr {
        padding: 0;
    }

    :global(body) {
        margin: 0;
    }

    .sign-container {
        display: flex;
        justify-content: center;
    }

    .tx-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
        top: 107px;
        left: 977px;
        width: 100%;
        background: #ffffff00 0% 0% no-repeat padding-box;
        opacity: 1;
        width: 90%;
        margin-top: 30px;
    }

    .tx-separator {
        border: 1px solid #e5e5e5;
        width: 100%;
        margin: 0;
    }

    .tx-description-container {
        top: 183px;
        left: 1008px;
        width: 100%;
        background: #f5f5f5 0% 0% no-repeat padding-box;
        opacity: 1;
        margin-top: 23px;
    }

    .tx-network-container {
        display: flex;
        flex-direction: row;
        margin-bottom: -16px;
        margin-top: -16px;
    }

    .tx-network-text {
        color: #2f69b7;
    }

    .tx-data-container {
        text-align: left;
        letter-spacing: 0.14px;
        color: #757575;
        opacity: 1;
        margin-top: 20px;
    }

    .tx-description-text {
        padding: 10px;
        font-weight: 500;
        margin: 0;
    }

    .tx-title {
        font-size: 17px;
        text-transform: uppercase;
        margin: 0;
    }

    .tx-operation-list-title {
        margin-top: 30px;
        font-size: 15px;
        text-transform: uppercase;
        width: 100%;
    }

    .tx-operation-container {
        margin-bottom: 25px;
    }

    .operation-list-container {
        position: relative;
    }

    .operation-list {
        padding: 0;
        margin-left: 15px;
    }

    .operations-group-container {
        border-style: solid;
    }

    .operations-container {
        width: 100%;
    }

    .tx-fee-container {
        display: flex;
        flex-direction: row;
        margin-top: 25px;
    }

    .confirmation-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .confirmation-buttons button {
        width: 140px;
        height: 39px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0px 4px 2px #00000029;
        opacity: 1;
        border: none;
    }

    .cancel-button {
        background: #f5f5f5 0% 0% no-repeat padding-box;
    }

    .sign-tx-button {
        color: #f5f5f5;
        background: #2f69b7 0% 0% no-repeat padding-box;
    }
</style>
