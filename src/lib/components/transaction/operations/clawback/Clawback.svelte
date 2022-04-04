<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let asset: string;
    export let amount: string;
    export let from: string;
</script>

<div class="simple-signer clawback-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_CLAWBACK}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ASSET} {asset}</p>
    <p>{$language.AMOUNT} {amount}</p>
    <p>{$language.FROM} {from}</p>
</div>
