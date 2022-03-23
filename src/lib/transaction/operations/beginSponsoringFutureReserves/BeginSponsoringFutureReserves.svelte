<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let defaultSource: string;
    export let optionalSource: string | undefined;
    export let sponsoredId: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer begin-sponsoring-future-reserves-operation">
    <h3>{lang.OPERATION_TYPE} {lang.OPERATION_BEGIN_SPONSORING_FUTURE_RESERVES}</h3>
    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.SPONSORED_ID} {sponsoredId}</p>
</div>
