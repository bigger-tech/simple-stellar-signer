<script lang="ts">
    import { sendMessage } from '../../helpers/sendMessageHelpers';
    import Transaction from '../../lib/transaction/Transaction.svelte';
    import { getParamsFromUrl } from './signHelpers';
    import { xdr, description, isXdrNull } from './signStore';
    import type IxdrInvalid from '../../lib/errors/IxdrInvalid';
    import type { IReadyEvent } from 'src/helpers/eventInterfaces/IReadyEvent';

    let readyEvent: IReadyEvent = {
        type: 'ready',
        message: 'Simple Signer is ready to operate',
    };

    function messageHandler(e: MessageEvent) {
        if ('xdr' in e.data && 'description' in e.data) {
            $xdr = e.data.xdr;
            $description = e.data.description;
        } else if ('xdr' in e.data) {
            $xdr = e.data.xdr;
        }
    }

    try {
        const parent = window.opener;
        const queryString = window.location.search;
        const urlParams = getParamsFromUrl(queryString);

        if (parent) {
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
        const invalidXdr: IxdrInvalid = {
            invalidXdrError: e,
        };
        console.error(invalidXdr);
    }
</script>

<h1>Sign</h1>

{#if $xdr}
    <Transaction txParams="{{ xdr: $xdr, description: $description }}" />
{:else if $isXdrNull}
    <h1>Sorry, a XDR wasn't provided</h1>
{:else}
    <p>Loading...</p>
{/if}
