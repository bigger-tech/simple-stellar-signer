<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let account: string;
    export let signer: string;
</script>

<div class="simple-signer revoke-signer-sponsorship-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_REVOKE_SIGNER_SPONSORSHIP}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.ACCOUNT} {account}</p>
    <p>{$language.SIGNER} {signer}</p>
</div>
