<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let exclude: any[] = [];
    let child: any;
    const dispatch = createEventDispatcher();
    function isExcluded(target: any) {
        var parent = target;
        while (parent) {
            if (exclude.indexOf(parent) >= 0 || parent === child) {
                return true;
            }
            parent = parent.parentNode;
        }
        return false;
    }
    function onClickOutside(event: any) {
        if (!isExcluded(event.target)) {
            dispatch('clickoutside');
        }
    }
</script>

<svelte:body on:click={onClickOutside} />
<div bind:this={child}>
    <slot />
</div>
