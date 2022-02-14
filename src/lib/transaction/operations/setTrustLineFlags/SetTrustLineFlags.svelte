<script lang="ts">
    export let optionalSource: string;
    export let defaultSource: string;
    export let trustor: string;
    export let asset: string;
    export let authorized: boolean;
    export let authorizedToMaintainLiabilities: boolean;
    export let clawbackEnabled: boolean | undefined;
</script>

<div class="simple-signer set-trust-line-flags-operation">
    <h3>Operation: Set Trustline Flags</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Trustor: {trustor}</p>
    <p>Asset: {asset}</p>
    <p>Is authorized: {authorized ? 'True' : 'False'}</p>
    <p>Is authorized to maintain liabilities: {authorizedToMaintainLiabilities ? 'True' : 'False'}</p>
    <p>Is clawback enabled: {clawbackEnabled ? 'True' : 'False'}</p>
</div>
