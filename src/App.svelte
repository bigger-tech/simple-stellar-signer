<script lang="ts">
    import { onMount } from 'svelte';
    import { Route, Router } from 'svelte-navigator';

    import Header from './lib/components/header/Header.svelte';
    import { WalletConnectService } from './lib/service/walletConnect';
    import Home from './routes/Home.svelte';
    import Connect from './routes/connect/Connect.svelte';
    import Logout from './routes/logout/Logout.svelte';
    import Payment from './routes/payment/Payment.svelte';
    import Sign from './routes/sign/Sign.svelte';
    import { detectedLanguage, isLanguageLoading, walletConnectClient } from './store/global';

    let walletConnectService: WalletConnectService;
    let isServiceInitialized = false;

    onMount(async () => {
        if (!$walletConnectClient) {
            walletConnectService = new WalletConnectService();
            $walletConnectClient = await walletConnectService.createClient();
        } else {
            walletConnectService = new WalletConnectService($walletConnectClient);
        }
        isServiceInitialized = true;
    });
</script>

{#if $detectedLanguage && !$isLanguageLoading}
    <Router primary={false}>
        <main>
            <Header walletConnectService={walletConnectService} />
            <Route path="/" component={Home} />
            <Route path="/connect" component={Connect} walletConnectService={walletConnectService} />
            <Route path="/sign" component={Sign} walletConnectService={walletConnectService} />
            <Route path="/payment" component={Payment} walletConnectService={walletConnectService} />
            <Route
                path="/logout"
                component={Logout}
                walletConnectService={walletConnectService}
                isServiceInitialized={isServiceInitialized}
            />
        </main>
    </Router>
{/if}
