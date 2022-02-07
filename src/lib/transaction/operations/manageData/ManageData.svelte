<script lang="ts">
    export let type: string;
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let name: string;
    export let value: Buffer | undefined;
</script>

<div class="simple-signer manage-data-operation">
    <h3>Operation type: {type}</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Data name: {name}</p>
    <p>Data content: {value}</p>
</div>
