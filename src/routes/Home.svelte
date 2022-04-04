<script lang="ts">
    import { Link } from 'svelte-navigator';
    import { language } from '../store/global';
</script>

<h1>Simple Signer</h1>
<div>
    <div>
        <Link to="/connect">{$language.GO_TO_CONNECT}</Link>
    </div>
    <div>
        <Link to="/sign">{$language.GO_TO_SIGN}</Link>
    </div>
</div>
