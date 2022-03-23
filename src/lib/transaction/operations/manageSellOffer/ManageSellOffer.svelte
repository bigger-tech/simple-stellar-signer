<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let selling: string;
    export let buying: string;
    export let amount: string;
    export let price: string;
    export let offerId: string;
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer manage-sell-offer-operation">
    <h3>{lang.OPERATION} {lang.MANAGE_SELL_OFFER}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.SELLING_ASSET} {selling}</p>
    <p>{lang.BUYING_ASSET} {buying}</p>
    <p>{lang.AMOUNT} {amount}</p>
    <p>{lang.PRICE} {price}</p>
    <p>{lang.OFFER_ID} {offerId}</p>
</div>
