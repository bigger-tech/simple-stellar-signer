<script lang="ts">
    export let operationItems: any[];
</script>

<div class="simple-signer operation-container">
    <div class="simple-signer operation-info-container">
        {#each operationItems as item}
            <div class="simple-signer operation-info">
                <p class="simple-signer operation-info-title">{item.title}</p>
                {#if Array.isArray(item.value)}
                    {#each item.value as value}
                        <p class="simple-signer break-key">{value}</p>
                    {/each}
                {:else}
                    <p class="simple-signer break-key">{item.value}</p>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    :global(.operation-info p) {
        margin: 0;
        margin-bottom: 7px;
    }

    :global(.operation-info) {
        margin-bottom: 18px;
        margin-left: 15px;
    }

    :global(.operation-info-title) {
        font-weight: bold;
    }

    :global(.operation-title) {
        margin: 0;
        margin-bottom: 13px;
        margin-left: 15px;
    }

    .break-key {
        word-break: break-all;
        letter-spacing: 0.14px;
        line-height: 21px;
        color: #757575;
        opacity: 1;
    }
</style>
