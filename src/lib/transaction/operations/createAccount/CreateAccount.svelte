<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let startingBalance: string;
    export let destination: string;
</script>

<div class="simple-signer create-account-operation">
    <h3>Operation: Create Account</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Starting Balance: {startingBalance}</p>
    <p>Destination: {destination}</p>
</div>
