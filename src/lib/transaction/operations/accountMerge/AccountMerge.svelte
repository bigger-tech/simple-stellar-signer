<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let destination: string;
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer account-merge-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_ACCOUNT_MERGE}</h3>
    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.DESTINATION} {destination}</p>
</div>
