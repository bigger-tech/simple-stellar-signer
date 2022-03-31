<script lang="ts">
    import { language } from '../../../../store/store';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let liquidityPoolId: string;
    export let amount: string;
    export let minAmountA: string;
    export let minAmountB: string;
</script>

<div class="simple-signer liquidity-pool-withdraw-operation">
    <h3>{$language.OPERATION_TYPE} {$language.OPERATION_TYPE_LIQUIDITY_POOL_WITHDRAW}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.LIQUIDITY_POOL_ID} {liquidityPoolId}</p>
    <p>{$language.AMOUNT} {amount}</p>
    <p>{$language.MIN_AMOUNT_A} {minAmountA}</p>
    <p>{$language.MIN_AMOUNT_B} {minAmountB}</p>
</div>
