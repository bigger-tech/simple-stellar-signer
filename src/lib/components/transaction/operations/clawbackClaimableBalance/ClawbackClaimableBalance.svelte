<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let balanceId: string;
</script>

<div class="simple-signer clawback-claimable-balance-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_CLAWBACK_CLAIMABLE_BALANCE}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.BALANCE_ID} {balanceId}</p>
</div>
