<script lang="ts">
    import { language } from '../../../../../store/global';

    export let defaultSource: string;
    export let optionalSource: string | undefined;
    export let bumpTo: string;
</script>

<div class="simple-signer bump-sequence-operation">
    <h3>{$language.OPERATION} {$language.OPERATION_BUMP_SEQUENCE}</h3>
    <p>{$language.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{$language.BUMP_TO} {bumpTo}</p>
</div>
