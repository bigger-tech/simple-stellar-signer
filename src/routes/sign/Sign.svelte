<script lang="ts">
    import Bridge from '../../lib/bridge/Bridge';
    import Transaction from '../../lib/components/transaction/Transaction.svelte';
    import { language } from '../../store/global';
    import { isTransactionVisible, transaction } from './signStore';

    const bridge = new Bridge();
    const urlParams = bridge.getTransactionMessageFromUrl();

    if (urlParams) {
        $transaction = urlParams;
    } else {
        $isTransactionVisible = false;
        bridge.addTransactionMessageHandler((message) => {
            $transaction = message;
            $isTransactionVisible = true;
        });
    }

    bridge.sendOnReadyEvent();
</script>

{#if $isTransactionVisible}
    {#if $transaction?.xdr}
        <Transaction transactionMessage={$transaction} />
    {:else if !$transaction?.xdr}
        <h1>{$language.XDR_NOT_PROVIDED}</h1>
    {:else}
        <p>{$language.LOADING}</p>
    {/if}
{/if}
