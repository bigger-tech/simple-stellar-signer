<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let selling: string;
    export let buying: string;
    export let amount: string;
    export let price: string;
    export let offerId: string;
</script>

<div class="simple-signer manage-sell-offer-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_MANAGE_SELL_OFFER}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.SELLING_ASSET} {selling}</p>
    <p>{$language.BUYING_ASSET} {buying}</p>
    <p>{$language.AMOUNT} {amount}</p>
    <p>{$language.PRICE} {price}</p>
    <p>{$language.OFFER_ID} {offerId}</p>
</div>
