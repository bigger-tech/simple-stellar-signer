<script lang="ts">
    import { language } from '../../../../store/store';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let liquidityPoolId: string;
    export let maxAmountA: string;
    export let maxAmountB: string;
    export let minPrice: string;
    export let maxPrice: string;
</script>

<div class="simple-signer liquidity-pool-deposit-operation">
    <h3>{$language.OPERATION_TYPE} {$language.OPERATION_LIQUIDITY_POOL_DEPOSIT}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.LIQUIDITY_POOL_ID} {liquidityPoolId}</p>
    <p>{$language.MAX_AMOUNT_A} {maxAmountA}</p>
    <p>{$language.MAX_AMOUNT_B} {maxAmountB}</p>
    <p>{$language.MINIMUM_PRICE} {minPrice}</p>
    <p>{$language.MAXIMUM_PRICE} {maxPrice}</p>
</div>
