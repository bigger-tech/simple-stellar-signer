<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let selling: string;
    export let buying: string;
    export let amount: string;
    export let price: string;
</script>

<div class="simple-signer create-passive-sell-offer-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_CREATE_PASSIVE_SELL_OFFER}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.SELLING} {selling}</p>
    <p>{$language.BUYING} {buying}</p>
    <p>{$language.AMOUNT} {amount}</p>
    <p>{$language.PRICE} {price}</p>
</div>
