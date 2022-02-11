<script lang="ts">
    export let optionalSource: string;
    export let defaultSource: string;
    export let seller: string;
    export let offerId: string;
</script>

<div class="simple-signer revoke-offer-sponsorship-operation">
    <h3>Operation: Revoke Offer Sponsorship</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Seller: {seller}</p>
    <p>Offer ID: {offerId}</p>
</div>
