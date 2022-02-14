<script lang="ts">
    import type { TrustLineFlag } from 'stellar-sdk';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let assetCode: string;
    export let authorize: boolean | TrustLineFlag | undefined;
</script>

<div class="simple-signer allow-trust-operation">
    <h3>Operation: Allow Trust</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Asset: {assetCode}</p>

    <p>Authorization: {authorize}</p>
</div>
