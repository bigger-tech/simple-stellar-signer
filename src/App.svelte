<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Connect from './routes/connect/Connect.svelte';
    import Home from './routes/Home.svelte';
    import Sign from './routes/sign/Sign.svelte';
</script>

<Router primary="{false}">
    <main>
        <Route path="/" component="{Home}" />
        <Route path="/connect" component="{Connect}" />
        <Route path="/sign" component="{Sign}" />
    </main>
</Router>
