<script lang="ts">
    import { language } from '../../../../store/store';
    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
</script>

<div class="simple-signer revoke-account-sponsorship-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_REVOKE_ACCOUNT_SPONSORSHIP}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ACCOUNT} {account}</p>
</div>
