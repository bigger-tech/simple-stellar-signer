<script lang="ts">
    import { Link } from 'svelte-navigator';
    import Transaction from '../lib/Transaction.svelte';
</script>

<h1>Sign</h1>

<Transaction />

<button class="simple-signer connect-btn"><Link to="/connect">Go to Connect</Link></button>
