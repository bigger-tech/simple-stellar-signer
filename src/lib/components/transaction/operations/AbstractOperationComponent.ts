import type IOperationComponent from './IOperationComponent';
import type IOperationComponentProps from './IOperationComponentProps';

export default abstract class AbstractOperationComponent implements IOperationComponent {
    public props: IOperationComponentProps;

    constructor(props: IOperationComponentProps) {
        this.props = props;
    }
}
