import type IOperationComponent from './IOperationComponent';
import type { SvelteComponent } from 'svelte';
import Operation from './Operation.svelte';
import type IOperationComponentProps from './IOperationComponentProps';
export default abstract class AbstractOperationComponent implements IOperationComponent {
    public component: typeof SvelteComponent;
    public props: IOperationComponentProps;

    constructor(props: IOperationComponentProps) {
        this.component = Operation;
        this.props = props;
    }
}
