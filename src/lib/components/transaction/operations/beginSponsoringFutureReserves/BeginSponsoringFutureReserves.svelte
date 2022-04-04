<script lang="ts">
    import { language } from '../../../../../store/global';

    export let defaultSource: string;
    export let optionalSource: string | undefined;
    export let sponsoredId: string;
</script>

<div class="simple-signer begin-sponsoring-future-reserves-operation">
    <h3>{$language.OPERATION_TYPE} {$language.OPERATION_BEGIN_SPONSORING_FUTURE_RESERVES}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.SPONSORED_ID} {sponsoredId}</p>
</div>
