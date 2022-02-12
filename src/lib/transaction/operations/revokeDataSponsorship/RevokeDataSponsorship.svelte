<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
    export let name: string;
</script>

<div class="simple-signer revoke-data-sponsorship-operation">
    <h3>Operation: Revoke Data Sponsorship</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Account: {account}</p>
    <p>Name: {name}</p>
</div>
