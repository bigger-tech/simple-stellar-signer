<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
</script>

<div class="simple-signer end-sponsoring-future-reserves-operation">
    <h3>Operation: Create Passive Sell Offer</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
</div>
