import type { ITransactionMessageComponentGroup } from './ITransactionMessageComponentGroup';

export interface ITransactionMessage {
    xdr: string;
    description: string | undefined;
    transactionGroups: ITransactionMessageComponentGroup[];
}
