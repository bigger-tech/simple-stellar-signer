<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let asset: string;
    export let destination: string;
    export let amount: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer payment-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_PAYMENT}</h3>
    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.ASSET} {asset}</p>
    <p>{lang.DESTINATION} {destination}</p>
    <p>{lang.AMOUNT} {amount}</p>
</div>
