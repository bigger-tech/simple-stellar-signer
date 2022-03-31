<script lang="ts">
    import { language } from '../../../../store/store';
    export let optionalSource: string;
    export let defaultSource: string;
    export let trustor: string;
    export let asset: string;
    export let authorized: boolean;
    export let authorizedToMaintainLiabilities: boolean;
    export let clawbackEnabled: boolean | undefined;
</script>

<div class="simple-signer set-trust-line-flags-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_SET_TRUSTLINE_FLAGS}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.TRUSTOR} {trustor}</p>
    <p>{$language.ASSET} {asset}</p>
    <p>{$language.IS_AUTHORIZED} {authorized ? 'True' : 'False'}</p>
    <p>{$language.IS_AUTHORIZED_TO_MAINTAIN_LIABILITIES} {authorizedToMaintainLiabilities ? 'True' : 'False'}</p>
    <p>{$language.IS_CLAWBACK_ENABLED} {clawbackEnabled ? 'True' : 'False'}</p>
</div>
