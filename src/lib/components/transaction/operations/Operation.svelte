<script lang="ts">
    import { language } from '../../../../store/global';
    import { isUserPublicKeyClicked } from '../transactionStore';
    import type IOperationComponentProps from './IOperationComponentProps';

    export let operationItems: IOperationComponentProps['operationItems'];
    export let shortedSourceAccount: string;

    const firstElementFromOperationItems = 0;

    function toggleSourceAccount() {
        $isUserPublicKeyClicked = !$isUserPublicKeyClicked;
    }
</script>

<div class="simple-signer operation-container">
    <div class="simple-signer operation-info-container">
        {#each operationItems as item, i}
            {#if item}
                <div class="simple-signer operation-info">
                    <p class="simple-signer operation-info-title">{$language[item.title]}</p>
                    {#if Array.isArray(item.value)}
                        {#each item.value as value}
                            <p class="simple-signer break-key">{value}</p>
                        {/each}
                    {:else}
                        <p class="simple-signer break-key">
                            {item.translatedValue ? $language[item.translatedValue] : item.value}
                        </p>
                        {#if i === firstElementFromOperationItems}
                            <span class="simple-signer user-operation-list-publickey" on:click={toggleSourceAccount}
                                >{$isUserPublicKeyClicked ? item.value : shortedSourceAccount}</span
                            >
                        {/if}
                    {/if}
                    {#if item.highlightTxDescription != undefined}
                        <p class="simple-signer warning-description">
                            {$language[item.highlightTxDescription]}
                        </p>
                    {/if}
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>
    .warning-description {
        color: #ff0000;
    }

    .user-operation-list-publickey {
        color: #2f69b7;
        word-wrap: break-word;
    }

    .operation-container {
        direction: ltr;
    }

    :global(.operation-info p) {
        margin: 0;
        margin-bottom: 7px;
    }

    :global(.operation-info) {
        margin-bottom: 18px;
        margin-left: 10px;
    }

    :global(.operation-info-title) {
        font-weight: bold;
    }

    :global(.operation-title) {
        margin: 0;
        margin-bottom: 13px;
        margin-left: 10px;
    }

    .break-key {
        word-break: break-word;
        letter-spacing: 0.14px;
        line-height: 21px;
        color: #757575;
        opacity: 1;
    }
</style>
