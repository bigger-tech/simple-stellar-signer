import type { OperationComponent } from './operations/OperationComponent';

export interface IOperationComponentGroup {
    description: string;
    operationComponents: OperationComponent[];
}
