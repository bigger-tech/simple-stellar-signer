<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let name: string;
    export let value: Buffer | undefined;
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer manage-data-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_MANAGE_DATA}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.NAME} {name}</p>
    {#if value}
        <p>{lang.DATA} {value}</p>
    {/if}
</div>
