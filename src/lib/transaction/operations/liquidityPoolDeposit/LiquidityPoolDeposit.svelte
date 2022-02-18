<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let liquidityPoolId: string;
    export let maxAmountA: string;
    export let maxAmountB: string;
    export let minPrice: string;
    export let maxPrice: string;
</script>

<div class="simple-signer liquidity-pool-deposit-operation">
    <h3>Operation type: Liquidity Pool Deposit</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Liquidity pool ID: {liquidityPoolId}</p>
    <p>Max amount A: {maxAmountA}</p>
    <p>Max amount B: {maxAmountB}</p>
    <p>Minimum price: {minPrice}</p>
    <p>Maximum price: {maxPrice}</p>
</div>
