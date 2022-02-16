<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let liquidityPoolId: string;
    export let amount: string;
    export let minAmountA: string;
    export let minAmountB: string;
</script>

<div class="simple-signer liquidity-pool-withdraw-operation">
    <h3>Operation type: Liquidity Pool Withdraw</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Liquidity pool ID: {liquidityPoolId}</p>
    <p>Amount: {amount}</p>
    <p>Minimum amount A: {minAmountA}</p>
    <p>Minimum amount B: {minAmountB}</p>
</div>
