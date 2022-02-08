<script lang="ts">
    export let defaultSource: string;
    export let optionalSource: string | undefined;
    export let sponsoredId: string;
</script>

<div class="simple-signer begin-sponsoring-future-reserves-operation">
    <h3>Operation type: Begin Sponsoring Future Reserves</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Sponsored ID: {sponsoredId}</p>
</div>
