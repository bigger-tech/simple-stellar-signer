<script lang="ts">
    import { language } from '../../../../store/store';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let destination: string;
</script>

<div class="simple-signer account-merge-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_ACCOUNT_MERGE}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.DESTINATION} {destination}</p>
</div>
