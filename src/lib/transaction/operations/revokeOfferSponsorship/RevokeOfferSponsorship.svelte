<script lang="ts">
    import { language } from '../../../../store/store';
    export let optionalSource: string;
    export let defaultSource: string;
    export let seller: string;
    export let offerId: string;
</script>

<div class="simple-signer revoke-offer-sponsorship-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_REVOKE_OFFER_SPONSORSHIP}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.SELLER} {seller}</p>
    <p>{$language.OFFER_ID} {offerId}</p>
</div>
