<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let balanceId: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer claim-claimable-balance-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_CLAIM_CLAIMABLE_BALANCE}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.BALANCE_ID} {balanceId}</p>
</div>
