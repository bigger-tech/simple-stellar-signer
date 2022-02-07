<script lang="ts">
    export let type: string;
    export let defaultSource: string;
    export let optionalSource: string | undefined;
    export let sponsoredId: string;
</script>

<div class="simple-signer begin-sponsoring-future-reserves-operation">
    <h1>Operation type: {type}</h1>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Sponsored ID: {sponsoredId}</p>
</div>
