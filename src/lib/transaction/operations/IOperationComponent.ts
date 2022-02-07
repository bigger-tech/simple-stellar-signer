import type { SvelteComponent } from 'svelte';

export default interface IOperationComponent {
    component: typeof SvelteComponent;
    props: {
        defaultSource: string;
        optionalSource: string | undefined;
    };
}
