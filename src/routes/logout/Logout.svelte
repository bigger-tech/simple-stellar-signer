<script lang="ts">
    import { afterUpdate } from 'svelte';

    import Bridge, { SimpleSignerPageType } from '../../lib/bridge/Bridge';
    import type { WalletConnectService } from '../../lib/service/walletConnect';
    import type IStorage from '../../lib/storage/IStorage';
    import LocalStorage from '../../lib/storage/storage';

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
