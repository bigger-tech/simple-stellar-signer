<script lang="ts">
    import Bridge from '../../lib/bridge/Bridge';
    import Transaction from '../../lib/components/transaction/Transaction.svelte';
    import { language } from '../../store/global';
    import { transaction } from './signStore';

    const bridge = new Bridge();
    const urlParams = bridge.getTransactionMessageFromUrl();

    if (urlParams) {
        $transaction = urlParams;
    } else {
        bridge.addTransactionMessageHandler((message) => {
            $transaction = message;
        });
    }

    bridge.sendOnReadyEvent();
</script>

{#if $transaction?.xdr}
    <Transaction transactionMessage={$transaction} />
{:else if !$transaction.xdr}
    <h1>{$language.XDR_NOT_PROVIDED}</h1>
{/if}
