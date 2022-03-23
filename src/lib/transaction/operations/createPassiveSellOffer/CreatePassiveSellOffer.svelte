<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let selling: string;
    export let buying: string;
    export let amount: string;
    export let price: string;
    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer create-passive-sell-offer-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_CREATE_PASSIVE_SELL_OFFER}</h3>

    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.SELLING} {selling}</p>
    <p>{lang.BUYING} {buying}</p>
    <p>{lang.AMOUNT} {amount}</p>
    <p>{lang.PRICE} {price}</p>
</div>
