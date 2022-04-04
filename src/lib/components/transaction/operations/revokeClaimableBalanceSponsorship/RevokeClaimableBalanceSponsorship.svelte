<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let balanceId: string;
</script>

<div class="simple-signer revoke-claimable-balance-sponsorship-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_REVOKE_CLAIMABLE_BALANCE_SPONSORSHIP}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.BALANCE_ID} {balanceId}</p>
</div>
