<script lang="ts">
    import { Link } from 'svelte-navigator';
</script>

<Link to="/">Got back to home</Link>
<h1>Operations</h1>
<div class="simple-signer operation-list">
    <Link to="payment">Go to Payment</Link>
    <Link to="createAccount">Go to Create Account</Link>
</div>

<style>
    .operation-list {
        display: flex;
        flex-direction: column;
    }
</style>
