<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
    export let startingBalance: string;
    export let destination: string;
</script>

<div class="simple-signer create-account-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_CREATE_ACCOUNT}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.STARTING_BALANCE} {startingBalance}</p>
    <p>{$language.DESTINATION} {destination}</p>
</div>
