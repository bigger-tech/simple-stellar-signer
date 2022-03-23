<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer revoke-account-sponsorship-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_REVOKE_ACCOUNT_SPONSORSHIP}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.ACCOUNT} {account}</p>
</div>
