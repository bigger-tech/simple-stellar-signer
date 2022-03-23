<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let defaultSource: string;
    export let optionalSource: string | undefined;
    export let bumpTo: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer bump-sequence-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_BUMP_SEQUENCE}</h3>
    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.BUMP_TO} {bumpTo}</p>
</div>
