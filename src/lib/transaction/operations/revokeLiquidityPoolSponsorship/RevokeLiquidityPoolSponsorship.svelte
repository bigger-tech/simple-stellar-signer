<script lang="ts">
    export let optionalSource: string;
    export let defaultSource: string;
    export let liquidityPoolId: string;
</script>

<div class="simple-signer revoke-liquidity-pool-sponsorship-operation">
    <h3>Operation: Revoke Liquidity Pool Sponsorship</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Liquidity Pool ID: {liquidityPoolId}</p>
</div>
