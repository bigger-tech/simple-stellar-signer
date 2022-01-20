<script lang="ts">
    import { Link } from 'svelte-navigator';
    import { XDRValue } from '../store/state';
</script>

<h1>THIS IS THE HOME URL</h1>

<Link to="/connect">Go to Connect</Link>
<br />

<Link to="/sign?xdr={encodeURIComponent($XDRValue)}">Go to Sign</Link>

<input type="text" id="xdr" bind:value="{$XDRValue}" />
