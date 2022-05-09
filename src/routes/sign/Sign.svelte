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

    setMinimumPopUpSize('sign');
</script>

{#if $transaction?.xdr}
    <Transaction transactionMessage={$transaction} on:cancel={handleCancel} on:confirm={handleConfirm} />
{:else if !$transaction.xdr}
    <h1>{$language.XDR_NOT_PROVIDED}</h1>
{/if}
