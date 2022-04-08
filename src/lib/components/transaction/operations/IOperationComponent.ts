import type { SvelteComponent } from 'svelte';
import type IOperationComponentProps from './IOperationComponentProps';

export default interface IOperationComponent {
    component: typeof SvelteComponent;
    props: IOperationComponentProps;
}
