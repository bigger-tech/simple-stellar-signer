<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let startingBalance: string;
    export let destination: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer create-account-operation">
    <h3>{lang.OPERATION} {lang.CREATE_ACCOUNT}</h3>
    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.STARTING_BALANCE} {startingBalance}</p>
    <p>{lang.DESTINATION} {destination}</p>
</div>
