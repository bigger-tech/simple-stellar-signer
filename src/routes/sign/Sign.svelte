<script lang="ts">
    import Bridge from '../../lib/bridge/Bridge';
    import Transaction from '../../lib/components/transaction/Transaction.svelte';
    import { language } from '../../store/global';

    const bridge = new Bridge();
    let transactionMessage = bridge.getTransactionMessageFromUrl();

    bridge.addTransactionMessageHandler((message) => {
        transactionMessage = message;
    });

    bridge.sendOnReadyEvent();
</script>

<h1>{$language.SIGN}</h1>

{#if transactionMessage?.xdr}
    <Transaction transactionMessage={transactionMessage} />
{:else if !transactionMessage?.xdr}
    <h1>{$language.XDR_NOT_PROVIDED}</h1>
{:else}
    <p>{$language.LOADING}</p>
{/if}
