import type { OperationComponentTypes } from './operations/OperationComponentTypes';

export interface IGroupsFromParam {
    from: number;
    to: number;
    description: string;
}

export interface ITxParams {
    xdr: string;
    description: string | undefined;
    operationsGroups: IGroupsFromParam[];
}

export interface IOperationsGroup {
    description: string;
    operationsComponents: typeof OperationComponentTypes[];
}
