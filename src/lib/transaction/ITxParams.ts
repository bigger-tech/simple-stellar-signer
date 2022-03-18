import type { OperationComponentTypes } from './operations/OperationComponentTypes';

export interface IGroupsFromParam {
    from: number;
    to: number;
    description: string;
}

export interface ITxParams {
    xdr: string;
    description: string | undefined;
    transactionGroups: IGroupsFromParam[];
}

export interface ITransactionGroup {
    description: string;
    operationsComponents: typeof OperationComponentTypes[];
}
