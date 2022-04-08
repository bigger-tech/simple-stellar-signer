<script lang="ts">
    export let title: string;
    export let operationItems: { title: string; value: string | string[] | number }[];
</script>

<h3 class="simple-signer operation-title">{title}</h3>
<div class="simple-signer operation-container">
    <div class="simple-signer operation-info-container">
        <div class="simple-signer operation-info">
            {#each operationItems as item}
                <p class="simple-signer operation-info-title">{item.title}</p>
                {#if Array.isArray(item.value)}
                    {#each item.value as value}
                        <p class="simple-signer break-key">{value}</p>
                    {/each}
                {:else}
                    <p class="simple-signer break-key">{item.value}</p>
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
    :global(.operation-info p) {
        margin: 0;
    }

    :global(.operation-info) {
        margin-bottom: 18px;
    }

    :global(.operation-info-title) {
        font-weight: bold;
    }

    .operation-info-container {
        border-left: 2px solid #e5e5e5;
        width: 100%;
        margin: 0;
    }

    .break-key {
        word-wrap: break-word;
    }
</style>
