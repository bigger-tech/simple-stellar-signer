<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
    export let signer: string;
</script>

<div class="simple-signer revoke-signer-sponsorship-operation">
    <h3>Operation: Revoke Signer Sponsorship</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Account: {account}</p>
    <p>Signer: {signer}</p>
</div>
