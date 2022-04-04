<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let name: string;
    export let value: Buffer | undefined;
</script>

<div class="simple-signer manage-data-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_MANAGE_DATA}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.NAME} {name}</p>
    {#if value}
        <p>{$language.DATA} {value}</p>
    {/if}
</div>
