<script lang="ts">
    import { Route, Router } from 'svelte-navigator';

    import Home from './routes/Home.svelte';
    import Connect from './routes/connect/Connect.svelte';
    import Sign from './routes/sign/Sign.svelte';
    import { detectedLanguage, isLanguageLoading } from './store/global';

    // async function getClient() {
    //     const client = await WalletConnectClient.init({
    //         projectId: process.env.VITE_WALLET_CONNECT_PROJECT_ID,
    //         relayUrl: 'wss://relay.walletconnect.org',
    //         metadata: {
    //             name: 'Simple Signer #1',
    //             description: 'Stellar Simple Signer',
    //             url: 'https://localhost:3001/',
    //             icons: ['https://walletconnect.com/walletconnect-logo.png'],
    //         },
    //     });

    //     window.localStorage.setItem('client', JSON.stringify(client));
    // }
    // getClient();
</script>

{#if $detectedLanguage && !$isLanguageLoading}
    <Router primary={false}>
        <main>
            <Route path="/" component={Home} />
            <Route path="/connect" component={Connect} />
            <Route path="/sign" component={Sign} />
        </main>
    </Router>
{/if}
