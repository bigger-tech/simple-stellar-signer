<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let name: string;
    export let value: Buffer | undefined;
</script>

<div class="simple-signer manage-data-operation">
    <h3>Operation: Manage Data</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Name: {name}</p>
    {#if value}
        <p>Data: {value}</p>
    {/if}
</div>
