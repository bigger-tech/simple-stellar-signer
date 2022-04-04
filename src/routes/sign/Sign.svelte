<script lang="ts">
    import Bridge from '../../lib/bridge/Bridge';
    import Transaction from '../../lib/components/transaction/Transaction.svelte';
    import { language, transaction } from '../../store/global';
    const bridge = new Bridge();
    const urlParams = bridge.getTransactionMessageFromUrl();

    if (urlParams) {
        $transaction = urlParams;
    }

    bridge.addTransactionMessageHandler((message) => {
        $transaction = message;
    });

    bridge.sendOnReadyEvent();
</script>

<h1>{$language.SIGN}</h1>

{#if $transaction?.xdr}
    <Transaction transactionMessage={$transaction} />
{:else if !$transaction?.xdr}
    <h1>{$language.XDR_NOT_PROVIDED}</h1>
{:else}
    <p>{$language.LOADING}</p>
{/if}
