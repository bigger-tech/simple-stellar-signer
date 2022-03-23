<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string;
    export let defaultSource: string;
    export let liquidityPoolId: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer revoke-liquidity-pool-sponsorship-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_REVOKE_LIQUIDITY_POOL_SPONSORSHIP}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.LIQUIDITY_POOL_ID} {liquidityPoolId}</p>
</div>
