import type { OperationComponent } from './operations/OperationComponent';

export interface IOperationGroupComponent {
    title: string;
    description: string;
    operationComponents: OperationComponent[];
}
