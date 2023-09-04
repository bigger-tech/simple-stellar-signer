<script lang="ts">
    import { onMount } from 'svelte';
    import { Route, Router } from 'svelte-navigator';

    import Header from './lib/components/header/Header.svelte';
    import { WalletConnectService } from './lib/service/walletConnect';
    import Home from './routes/Home.svelte';
    import Connect from './routes/connect/Connect.svelte';
    import Sign from './routes/sign/Sign.svelte';
    import { detectedLanguage, isLanguageLoading, walletConnectClient } from './store/global';

    let walletConnectService: WalletConnectService;

    onMount(async () => {
        if (!$walletConnectClient) {
            walletConnectService = new WalletConnectService();
            $walletConnectClient = await walletConnectService.createClient();
        } else {
            walletConnectService = new WalletConnectService($walletConnectClient);
        }
    });
</script>

{#if $detectedLanguage && !$isLanguageLoading}
    <Router primary={false}>
        <main>
            <Header walletConnectService={walletConnectService} />
            <Route path="/" component={Home} />
            <Route path="/connect" component={Connect} walletConnectService={walletConnectService} />
            <Route path="/sign" component={Sign} walletConnectService={walletConnectService} />
        </main>
    </Router>
{/if}
