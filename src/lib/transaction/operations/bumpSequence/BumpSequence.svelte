<script lang="ts">
    export let defaultSource: string;
    export let optionalSource: string | undefined;
    export let bumpTo: string;
</script>

<div class="simple-signer bump-sequence-operation">
    <h3>Operation: Bump Sequence</h3>
    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Bump to: {bumpTo}</p>
</div>
