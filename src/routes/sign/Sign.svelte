<script lang="ts">
    import Transaction from '../../lib/transaction/Transaction.svelte';
    import { xdr, description, waiting } from './signStore';

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const xdrParam = urlParams.get('xdr');
    const descriptionParam = urlParams.get('description');
    let urlXdr: string;

    if (xdrParam) {
        urlXdr = xdrParam.replace(/\s/g, '+');
    }

    setTimeout(() => {
        if (!$xdr || !urlXdr) {
            $waiting = false;
        }
    }, 2000);

    window.addEventListener('message', (e) => {
        if (e.origin !== 'https://localhost:3000') {
            return;
        } else {
            console.log(e);
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

{#if $xdr || xdrParam}
    <Transaction txXdr="{$xdr || urlXdr}" description="{$description || descriptionParam}" />
{:else if $waiting}
    <p>Loading...</p>
{:else}
    <h1>XDR NULL</h1>
{/if}
