<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer end-sponsoring-future-reserves-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_END_SPONSORING_FUTURE_RESERVES}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
</div>
