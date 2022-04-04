<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
    export let name: string;
</script>

<div class="simple-signer revoke-data-sponsorship-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_REVOKE_DATA_SPONSORSHIP}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ACCOUNT} {account}</p>
    <p>{$language.NAME} {name}</p>
</div>
