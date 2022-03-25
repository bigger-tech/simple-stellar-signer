import type { OperationComponentTypes } from './operations/OperationComponentTypes';

export interface IGroup {
    from: number;
    to: number;
    description: string;
}

export interface ITxParams {
    xdr: string;
    description: string | undefined;
    transactionGroups: IGroup[];
}

export interface ITransactionGroup {
    description: string;
    operationComponents: typeof OperationComponentTypes[];
}
