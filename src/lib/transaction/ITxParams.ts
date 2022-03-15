import type { OperationComponentTypes } from './operations/OperationComponentTypes';

export interface ITxParams {
    xdr: string;
    description: string | undefined;
    operationsGroups: { from: number; to: number; description: string }[];
}

export interface IOperationsGroup {
    description: string;
    operationsComponents: typeof OperationComponentTypes[];
}
