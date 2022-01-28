<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Connect from './routes/connect/Connect.svelte';
    import OperationsList from './routes/transaction/OperationsList.svelte';
    import Home from './routes/Home.svelte';
    import Sign from './routes/Sign.svelte';
    import Operation from './routes/transaction/OperationFactory.svelte';
</script>

<Router primary="{false}">
    <main>
        <Route path="/" component="{Home}" />
        <Route path="/connect" component="{Connect}" />
        <Route path="sign/*">
            <Route path="/">
                <Sign />
            </Route>
            <Route path="?xdr=:xdr" component="{Sign}" />
        </Route>
    </main>
</Router>

<Router>
    <main>
        <Route path="/operation" component="{OperationsList}" />
        <Route path="/operation/:operation" component="{Operation}" />
    </main>
</Router>
