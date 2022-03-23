<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string;
    export let defaultSource: string;
    export let seller: string;
    export let offerId: string;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer revoke-offer-sponsorship-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_REVOKE_OFFER_SPONSORSHIP}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.SELLER} {seller}</p>
    <p>{lang.OFFER_ID} {offerId}</p>
</div>
