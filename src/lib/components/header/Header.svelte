<script lang="ts">
    import type { WalletConnectService } from '../../../lib/service/walletConnect';
    import { isLogoutVisible } from '../../../store/global';
    import type IStorage from '../../storage/IStorage';
    import LocalStorage from '../../storage/storage';
    import clickOutside from '../helpers/clickOutside';
    import Language from '../language/Language.svelte';
    import { isLanguageMenuVisible } from '../language/languageStore';
    import Logout from '../logout/Logout.svelte';

    export let walletConnectService: WalletConnectService;

    const storage: IStorage = new LocalStorage();
    const isUserConnected = storage.getItem('wallet');

    function hideMenu() {
        $isLanguageMenuVisible = false;
        $isLogoutVisible = false;
    }
</script>

<header class="simple-signer header row-space-between-center header-border">
    <div class="simple-signer logout-language-container row-space-between-center" use:clickOutside={hideMenu}>
        <div class="simple-signer logout-container">
            {#if isUserConnected}
                <Logout storage={storage} walletConnectService={walletConnectService} />
            {/if}
        </div>
        <div class="simple-signer language-container">
            <div class="simple-signer column-center">
                <Language />
            </div>
        </div>
    </div>
</header>

<style>
    .simple-signer.row-space-between-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: 129px;
    }

    .simple-signer.column-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
