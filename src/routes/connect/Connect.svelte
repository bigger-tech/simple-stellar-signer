<script lang="ts">
    import Wallets from '../../lib/wallets/Wallets.svelte';
    import { getParamsFromUrl } from './connectHelpers';
    import EventsClass from '../../helpers/EventsClass';
    import { sendMessage } from '../../helpers/sendMessageHelpers';
    const defaultWallets = ['xbull', 'albedo', 'rabet', 'freighter', 'privateKey'];
    const urlParams = getParamsFromUrl();
    const parent = window.opener;
    let wallets: string[] = [];

    function messageHandler(e: MessageEvent): void {
        if ('wallets' in e.data) {
            wallets = e.data.wallets;
        }
    }

    if (parent) {
        const readyEvent = EventsClass.onReadyEvent();
        sendMessage(readyEvent);
        window.addEventListener('message', messageHandler);
    } else if (urlParams && urlParams.length > 0) {
        wallets = urlParams;
    } else {
        wallets = defaultWallets;
    }
</script>

{#if wallets.length > 0}
    <Wallets wallets="{wallets}" defaultWallets="{defaultWallets}" />
{/if}
