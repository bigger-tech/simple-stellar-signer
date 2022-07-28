<script lang="ts">
    import { Route, Router } from 'svelte-navigator';

    import Header from './lib/components/header/Header.svelte';
    import Home from './routes/Home.svelte';
    import Connect from './routes/connect/Connect.svelte';
    import Sign from './routes/sign/Sign.svelte';
    import { detectedLanguage, isLanguageLoading } from './store/global';
</script>

{#if $detectedLanguage && !$isLanguageLoading}
    <Router primary={false}>
        <main>
            <Header />
            <Route path="/" component={Home} />
            <Route path="/connect" component={Connect} />
            <Route path="/sign" component={Sign} />
        </main>
    </Router>
{/if}
