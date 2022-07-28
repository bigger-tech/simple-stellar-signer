<script lang="ts">
    import Bridge, { SimpleSignerPageType } from '../../lib/bridge/Bridge';
    import { setMinimumPopUpSize } from '../../lib/components/helpers/popUpSizeHelper';
    import Transaction from '../../lib/components/transaction/Transaction.svelte';
    import { language } from '../../store/global';
    import { transaction } from './signStore';

    const bridge = new Bridge(SimpleSignerPageType.SIGN);
    const urlParams = bridge.getTransactionMessageFromUrl();

    if (urlParams) {
        $transaction = urlParams;
    } else {
        bridge.addTransactionMessageHandler((message) => {
            $transaction = message;
        });
    }

    function handleCancel() {
        bridge.sendOnCancelEvent();
    }

    function handleConfirm(event: CustomEvent) {
        const signedXdr = event.detail as string;
        bridge.sendSignedTx(signedXdr);
    }

    bridge.sendOnReadyEvent();

    const minimumSignPopupHeight = 570;
    const minimumSignPopupWidth = 360;
    const defaultSignPopupHeight = 570;
    const defaultSignPopupWidth = 360;

    setMinimumPopUpSize(minimumSignPopupHeight, minimumSignPopupWidth, defaultSignPopupHeight, defaultSignPopupWidth);
</script>

<div class="simple-signer sign-container">
    <div class="simple-signer tx-container">
        {#if $transaction?.xdr}
            <Transaction transactionMessage={$transaction} on:cancel={handleCancel} on:confirm={handleConfirm} />
        {:else if !$transaction.xdr}
            <h1 class="simple-signer error-title">{$language.ERROR}</h1>
            <div class="simple-signer information-container">
                <p class="simple-signer xdr-not-provided">{$language.XDR_NOT_PROVIDED}</p>
                <div class="simple-signer close-button">
                    <button class="simple-signer sign-tx-button" on:click={handleCancel}>{$language.CLOSE}</button>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .xdr-not-provided {
        margin-bottom: 50px;
    }
    .information-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .sign-container {
        display: flex;
        justify-content: space-around;
    }
    .tx-container {
        font-family: 'Roboto', sans-serif;
        top: 107px;
        left: 977px;
        background: #ffffff00 0% 0% no-repeat padding-box;
        opacity: 1;
        width: 85%;
        max-width: 316px;
    }
    .sign-tx-button {
        color: #f5f5f5;
        background: #2f69b7 0% 0% no-repeat padding-box;
    }
    .sign-tx-button:hover {
        opacity: 50%;
        cursor: pointer;
    }
    .close-button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .close-button button {
        width: 140px;
        height: 39px;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0px 4px 2px #00000029;
        opacity: 1;
        border: none;
        margin-bottom: 30px;
    }
    .error-title {
        font-size: 16px;
        text-transform: uppercase;
    }
</style>
