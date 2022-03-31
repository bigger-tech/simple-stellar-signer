<script lang="ts">
    import { sendMessage } from '../../helpers/sendMessageHelpers';
    import Transaction from '../../lib/transaction/Transaction.svelte';
    import { getParamsFromUrl } from './signHelpers';
    import { xdr, description, transactionGroups, isXdrNull } from './signStore';
    import EventsClass from '../../helpers/EventsClass';
    import { language } from '../../store/store';

    function messageHandler(e: MessageEvent): void {
        if ('xdr' in e.data) {
            $xdr = e.data.xdr;
        } else {
            $isXdrNull = true;
        }

        if ('description' in e.data) {
            $description = e.data.description;
        }

        if ('transactionGroups' in e.data) {
            $transactionGroups = e.data.transactionGroups;
        }
    }

    try {
        const parent = window.opener;
        const queryString = window.location.search;
        const urlParams = getParamsFromUrl(queryString);

        if (parent) {
            const readyEvent = EventsClass.onReadyEvent();
            sendMessage(readyEvent);
            window.addEventListener('message', messageHandler);
        } else if (urlParams) {
            $xdr = urlParams.xdr;

            if (urlParams.description) {
                $description = urlParams.description;
            }
        } else {
            $isXdrNull = true;
        }
    } catch (e) {
        console.error(e);
    }
</script>

<h1>{$language.SIGN}</h1>

{#if $xdr}
    <Transaction txParams="{{ xdr: $xdr, description: $description, transactionGroups: $transactionGroups }}" />
{:else if $isXdrNull}
    <h1>{$language.XDR_NOT_PROVIDED}</h1>
{:else}
    <p>{$language.LOADING}</p>
{/if}
