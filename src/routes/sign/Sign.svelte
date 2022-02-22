<script lang="ts">
    import Transaction from '../../lib/transaction/Transaction.svelte';
    import { getParamsFromUrl } from './signHelpers';
    import { xdr, description, isWaiting } from './signStore';

    const queryString = window.location.search;
    const urlParams = getParamsFromUrl(queryString);

    if (urlParams) {
        $xdr = urlParams.xdr;
        $description = urlParams.description;
    }

    setTimeout(() => {
        if (!$xdr) {
            $isWaiting = false;
        }
    }, 2000);

    window.addEventListener('message', (e) => {
        if (e.origin !== 'https://localhost:3000') {
            return;
        } else {
            if ('xdr' in e.data) {
                $xdr = e.data.xdr;
            }

            if ('description' in e.data) {
                $description = e.data.description;
            }
        }
    });
</script>

<h1>Sign</h1>

{#if $xdr}
    <Transaction txParams="{{ xdr: $xdr, description: $description }}" />
{:else if $isWaiting}
    <p>Loading...</p>
{:else}
    <h1>XDR NULL</h1>
{/if}
