<script lang="ts">
    import { sendMessage } from '../../helpers/sendMessageHelpers';
    import Transaction from '../../lib/transaction/Transaction.svelte';
    import { getParamsFromUrl } from './signHelpers';
    import { xdr, description, operationsDescription, isXdrNull } from './signStore';
    import EventsClass from '../../helpers/EventsClass';

    function messageHandler(e: MessageEvent): void {
        if ('xdr' in e.data) {
            $xdr = e.data.xdr;
        } else {
            $isXdrNull = true;
        }

        if ('description' in e.data) {
            $description = e.data.description;
        }

        if ('operationsDescription' in e.data) {
            $operationsDescription = e.data.operationsDescription;
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

<h1>Sign</h1>

{#if $xdr}
    <Transaction txParams="{{ xdr: $xdr, description: $description, operationsDescription: $operationsDescription }}" />
{:else if $isXdrNull}
    <h1>Sorry, an XDR wasn't provided</h1>
{:else}
    <p>Loading...</p>
{/if}
