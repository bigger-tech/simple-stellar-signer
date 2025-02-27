<script lang="ts">
    import { afterUpdate } from 'svelte';
    import { BarLoader } from 'svelte-loading-spinners';

    import Bridge, { SimpleSignerPageType } from '../../lib/bridge/Bridge';
    import type { WalletConnectService } from '../../lib/service/walletConnect';
    import type IStorage from '../../lib/storage/IStorage';
    import LocalStorage from '../../lib/storage/storage';
    import { language } from '../../store/global';

    export let walletConnectService: WalletConnectService;
    export let isServiceInitialized: boolean;

    const bridge = new Bridge(SimpleSignerPageType.LOGOUT);
    const storage: IStorage = new LocalStorage();

    afterUpdate(() => {
        if (isServiceInitialized) {
            walletConnectService.disconnectAllSessions();
            storage.clearStorage();
            bridge.sendOnLogOutEvent();
        }
    });
</script>

<div class="simple-signer wallets-loading-container">
    <p>{$language.LOGGING_OUT}</p>
    <BarLoader color="#2f69b7" size={40} />
</div>

<style>
    .wallets-loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Roboto', sans-serif;
    }
</style>
