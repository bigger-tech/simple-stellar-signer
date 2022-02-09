<script lang="ts">
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let destination: string;
</script>

<div class="simple-signer account-merge-operation">
    <h3>Operation: Account Trust</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Destination: {destination}</p>
</div>
