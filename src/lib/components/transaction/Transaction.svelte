<script lang="ts">
    import { Transaction, xdr } from 'stellar-sdk';
    import { Link } from 'svelte-navigator';

    import languageIcon from '../../../assets/icons/language.svg';
    import xMarkIcon from '../../../assets/icons/xmark.svg';
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
    import Operation from './operations/Operation.svelte';
    import type { OperationComponent } from './operations/OperationComponent';
    import OperationsGroup from './operations/OperationsGroup.svelte';
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

    let arrowsUp: boolean[] = [];
    let allArrowsUp = false;

    function registerArrows() {
        transactionGroups.forEach(() => {
            arrowsUp.push(false);
        });
    }
    registerArrows();

    function rotateArrow(i: number) {
        arrowsUp[i] = !arrowsUp[i];
    }
    function rotateAllArrows() {
        if (!allArrowsUp) {
            arrowsUp.forEach((arrow, i) => {
                if (arrow === false) {
                    arrowsUp[i] = !arrow;
                }
            });
            allArrowsUp = !allArrowsUp;
        } else {
            arrowsUp.forEach((arrow, i) => {
                if (arrow === true) {
                    arrowsUp[i] = !arrow;
                }
            });
            allArrowsUp = !allArrowsUp;
        }
    }

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

    console.log(transactionGroups);
</script>

{#if isValidXdr}
    <div class="simple-signer language-container">
        <button class="simple-signer language-button"><img src={languageIcon} alt="*" /></button>
        <button class="simple-signer xmark-button"><img src={xMarkIcon} alt="*" /></button>
    </div>
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
                    <div class="simple-signer tx-sequence-number">
                        <p class="sequence-number">{$language.SEQUENCE_NUMBER} {tx ? tx.sequence : ''}</p>
                    </div>
                    <div class="simple-signer tx-source-account">
                        <p class="simple-signer source-account">
                            {$language.SOURCE_ACCOUNT}
                            {shortedSourceAccount}
                        </p>
                    </div>
                </div>
                <Signatures signatures={tx.signatures} />
                <hr class="simple-signer tx-separator" />
                <div class="simple-signer operations-container">
                    <div class="operation-list-title-container">
                        <h1 class="simple-signer tx-operation-list-title">Lista de Operaciones</h1>
                        <a class="simple-signer expand-all-button" on:click={rotateAllArrows} href="#"
                            ><span>{allArrowsUp ? 'Hide all' : 'Expand all'}</span></a
                        >
                    </div>
                    <div class="simple-signer operation-list-container">
                        {#each transactionGroups as group, i}
                            <div class="simple-signer operation-head">
                                <h3 class="simple-signer operation-title-head">
                                    {i + 1}. {'title' in group ? group.title : group.props.title}
                                </h3>
                                <button
                                    on:click={() => {
                                        rotateArrow(i);
                                    }}><i class="arrow down {arrowsUp[i] ? 'spin-up' : ''}" /></button
                                >
                            </div>
                            <div class="simple-signer tx-operation-container {arrowsUp[i] ? 'show-operation' : ''}">
                                {#if 'description' in group}
                                    <OperationsGroup
                                        description={group.description}
                                        operationComponents={group.operationComponents}
                                    />
                                {:else}
                                    <Operation operationItems={group.props.operationItems} />
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
                <hr class="simple-signer tx-separator" />
                <div class="simple-signer tx-fee-container">
                    <p class="simple-signer operation-info-title">{$language.FEE}</p>
                    &nbsp;
                    <p>{tx.fee}</p>
                </div>
                <div class="simple-signer confirmation-buttons">
                    <button class="simple-signer cancel-button">Cancel</button>
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

    :global(body::-webkit-scrollbar) {
        display: none;
    }

    :global(body) {
        margin: 0;
    }

    p {
        margin: 0;
    }

    .show-operation {
        max-height: 300px !important;
        margin-bottom: 25px;
    }

    .arrow {
        border: solid #757575;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        transition: transform 0.3s;
    }

    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
    .expand-all-button {
        color: #2f69b7;
        text-align: left;
        min-width: fit-content;
        font-size: 12px;
    }
    .spin-up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }

    .operation-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .language-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 11px;
    }

    .language-button {
        margin-top: 11px;
    }

    .xmark-button {
        margin-top: 10px;
    }

    .language-button img {
        height: 21px;
    }

    .xmark-button img {
        height: 23px;
    }

    .language-container button {
        height: 0;
        border: none;
        margin-left: 8px;
        padding: 0;
        background-color: transparent;
    }

    .language-container img {
        filter: invert(51%) sepia(0%) saturate(1810%) hue-rotate(221deg) brightness(89%) contrast(89%);
    }

    .language-container button:hover {
        cursor: pointer;
        color: red;
    }

    .operation-head button {
        border: none;
        margin-top: -2px;
        padding: 0;
        background-color: transparent;
    }

    .operation-head button:hover {
        cursor: pointer;
    }
    .operation-list-title-container {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    .sign-container {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-left: 30px;
        margin-right: 30px;
    }

    .tx-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
        top: 107px;
        left: 977px;
        width: 100%;
        background: #ffffff00 0% 0% no-repeat padding-box;
        opacity: 1;
        width: 100%;
        margin-top: 20px;
    }

    .tx-separator {
        border: 1px solid #e5e5e5;
        width: 100%;
        margin: 0;
        margin-top: 12px;
    }

    :global(.tx-description-container) {
        top: 183px;
        left: 1008px;
        width: 100%;
        background: #f5f5f5 0% 0% no-repeat padding-box;
        opacity: 1;
        margin-top: 23px;
    }

    .operation-title-head {
        margin: 0;
        margin-bottom: 15px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .tx-network-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
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
        margin-bottom: 27px;
        font-size: 14px;
    }

    .tx-sequence-number {
        margin-bottom: 8px;
    }

    .tx-source-account {
        margin-bottom: 20px;
    }

    :global(.tx-description-text) {
        padding: 10px;
        font-weight: 500;
        margin: 0;
    }

    .tx-title {
        font-size: 16px;
        text-transform: uppercase;
        margin: 0;
    }

    .tx-operation-list-title {
        margin-top: 31px;
        margin-bottom: 23px;
        font-size: 14px;
        text-transform: uppercase;
        width: 100%;
    }

    .tx-operation-container {
        overflow: hidden;
        max-height: 0px;
        transition: max-height 0.3s;
        position: relative;
        font-size: 14px;
    }

    .tx-operation-container::after {
        content: '';
        height: 100%;
        width: 2px;

        position: absolute;
        top: 6px;

        background-color: #e5e5e5;
    }

    .operation-list-container {
        position: relative;
    }

    .operations-container {
        width: 100%;
    }

    .tx-fee-container {
        display: flex;
        flex-direction: row;
        margin-top: 31px;
        margin-bottom: 32px;
    }

    .confirmation-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
        margin-bottom: 30px;
    }

    .cancel-button {
        background: #f5f5f5 0% 0% no-repeat padding-box;
    }

    .sign-tx-button {
        color: #f5f5f5;
        background: #2f69b7 0% 0% no-repeat padding-box;
    }
</style>
