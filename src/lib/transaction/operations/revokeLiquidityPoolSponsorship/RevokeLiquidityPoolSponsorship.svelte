<script lang="ts">
    import { language } from '../../../../store/store';
    export let optionalSource: string;
    export let defaultSource: string;
    export let liquidityPoolId: string;
</script>

<div class="simple-signer revoke-liquidity-pool-sponsorship-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_REVOKE_LIQUIDITY_POOL_SPONSORSHIP}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.LIQUIDITY_POOL_ID} {liquidityPoolId}</p>
</div>
