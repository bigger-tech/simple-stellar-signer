<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
</script>

<div class="simple-signer revoke-account-sponsorship-operation">
    <h3>Operation: Revoke Account Sponsorship</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Account: {account}</p>
</div>
