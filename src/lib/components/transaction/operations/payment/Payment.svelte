<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let asset: string;
    export let destination: string;
    export let amount: string;
</script>

<div class="simple-signer payment-operation">
    <h3>{$language.OPERATION_PAYMENT}</h3>
    <div class="simple-signer operation-info">
        <p class="simple-signer operation-info-title">{$language.SOURCE_ACCOUNT}</p>
        <p class="simple-signer break-key">{optionalSource ? optionalSource : defaultSource}</p>
    </div>
    <div class="simple-signer operation-info">
        <p class="simple-signer operation-info-title">{$language.ASSET}</p>
        <p>{asset}</p>
    </div>
    <div class="simple-signer operation-info">
        <p class="simple-signer operation-info-title">{$language.DESTINATION}</p>
        <p class="simple-signer break-key">{destination}</p>
    </div>
    <div class="simple-signer operation-info">
        <p class="simple-signer operation-info-title">{$language.AMOUNT}</p>
        <p>{amount}</p>
    </div>
</div>

<style>
    :global(.operation-info p) {
        margin: 0;
    }

    :global(.operation-info) {
        margin-bottom: 18px;
    }

    :global(.operation-info-title) {
        font-weight: bold;
    }

    .break-key {
        word-wrap: break-word;
    }
</style>
