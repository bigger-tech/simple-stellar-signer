<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Connect from './routes/Connect.svelte';
    import Sign from './routes/Sign.svelte';
</script>

<Router>
    <main>
        <Route path="/" component="{Connect}" />
        <Route path="/connect" component="{Connect}" />
        <Route path="/sign" component="{Sign}" />
    </main>
</Router>
