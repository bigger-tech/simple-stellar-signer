<script lang="ts">
    import { onMount } from 'svelte';

    import { Router, Route } from 'svelte-navigator';
    import { testCrypto } from './helpers/security2';
    import WalletLanguage from './helpers/WalletLanguage';
    import Connect from './routes/connect/Connect.svelte';
    import Home from './routes/Home.svelte';
    import Sign from './routes/sign/Sign.svelte';
    import { detectedLanguage, language } from './store/store';
    onMount(async () => {
        return ($language = await new WalletLanguage().getText());
    });

    testCrypto();
</script>

{#if $detectedLanguage}
    <Router primary="{false}">
        <main>
            <Route path="/" component="{Home}" />
            <Route path="/connect" component="{Connect}" />
            <Route path="/sign" component="{Sign}" />
        </main>
    </Router>
{/if}
