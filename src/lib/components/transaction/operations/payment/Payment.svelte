<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let asset: string;
    export let destination: string;
    export let amount: string;
</script>

<div class="simple-signer payment-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_PAYMENT}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ASSET} {asset}</p>
    <p>{$language.DESTINATION} {destination}</p>
    <p>{$language.AMOUNT} {amount}</p>
</div>
