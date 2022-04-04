<script lang="ts">
    import { language } from '../../../../../store/global';

    export let optionalSource: string | undefined;
    export let defaultSource: string;
</script>

<div class="simple-signer end-sponsoring-future-reserves-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_END_SPONSORING_FUTURE_RESERVES}</h3>

    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
</div>
