<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let balanceId: string;
</script>

<div class="simple-signer claim-claimable-balance-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_CLAIM_CLAIMABLE_BALANCE}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.BALANCE_ID} {balanceId}</p>
</div>
