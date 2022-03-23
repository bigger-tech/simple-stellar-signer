<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let asset: string;
    export let amount: string;
    export let from: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer clawback-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_CLAWBACK}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.ASSET} {asset}</p>
    <p>{lang.AMOUNT} {amount}</p>
    <p>{lang.FROM} {from}</p>
</div>
