import type { OperationComponent } from './operations/OperationComponent';

export interface IOperationComponentGroup {
    title: string;
    description: string;
    operationComponents: OperationComponent[];
}
