<script lang="ts">
    import { language } from '../../../../store/global';
    import type IOperationComponent from './IOperationComponent';
    import Operation from './Operation.svelte';

    export let description: string;
    export let operationComponents: IOperationComponent[];
    export let shortedSourceAccount: string;
</script>

<div class="simple-signer operation-group-container">
    <div class="simple-signer operation-group-description">
        <p class="simple-signer">{description}</p>
    </div>
    {#each operationComponents as component}
        <ul>
            <li>
                <span class="simple-signer operation-title-head operation-info-title"
                    >{$language[component.props.title]}</span
                >
            </li>
        </ul>
        <Operation shortedSourceAccount={shortedSourceAccount} operationItems={component.props.operationItems} />
    {/each}
</div>

<style>
    .operation-group-container {
        direction: ltr;
    }

    .operation-group-description {
        margin: 0;
        margin-left: 10px;
    }

    ul {
        padding: 0px;
        margin: 0;
        margin-top: 23px;
        margin-left: 35px;
        margin-bottom: 8px;
    }

    .operation-title-head {
        position: relative;
        left: -6px;
    }

    li::marker {
        font-size: 16px;
    }

    .operation-group-description p {
        letter-spacing: 0.14px;
        margin: 0;
        color: #757575;
        opacity: 1;
    }
</style>
