<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let liquidityPoolId: string;
    export let maxAmountA: string;
    export let maxAmountB: string;
    export let minPrice: string;
    export let maxPrice: string;
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer liquidity-pool-deposit-operation">
    <h3>{lang.OPERATION_TYPE} {lang.OPERATION_LIQUIDITY_POOL_DEPOSIT}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.LIQUIDITY_POOL_ID} {liquidityPoolId}</p>
    <p>{lang.MAX_AMOUNT_A} {maxAmountA}</p>
    <p>{lang.MAX_AMOUNT_B} {maxAmountB}</p>
    <p>{lang.MINIMUM_PRICE} {minPrice}</p>
    <p>{lang.MAXIMUM_PRICE} {maxPrice}</p>
</div>
