<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let liquidityPoolId: string;
    export let amount: string;
    export let minAmountA: string;
    export let minAmountB: string;
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer liquidity-pool-withdraw-operation">
    <h3>{lang.OPERATION_TYPE} {lang.OPERATION_TYPE_LIQUIDITY_POOL_WITHDRAW}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.LIQUIDITY_POOL_ID} {liquidityPoolId}</p>
    <p>{lang.AMOUNT} {amount}</p>
    <p>{lang.MIN_AMOUNT_A} {minAmountA}</p>
    <p>{lang.MIN_AMOUNT_B} {minAmountB}</p>
</div>
