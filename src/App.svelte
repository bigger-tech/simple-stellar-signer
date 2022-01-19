<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Connect from './routes/Connect.svelte';
    import Home from './routes/Home.svelte';
    import Sign from './routes/Sign.svelte';
</script>

<Router>
    <main>
        <Route path="/" component="{Home}" />
        <Route path="/connect" component="{Connect}" />
        <Route path="sign/*">
            <Route path="/">
                <Sign />
            </Route>
            <Route path="?xdr=:xdr" component="{Sign}" let:params />
        </Route>
    </main>
</Router>
