import type { ITransactionMessage } from './ITransactionMessage';
import type { ITransactionMessageComponentGroup } from './ITransactionMessageComponentGroup';

export default class TransactionMessage implements ITransactionMessage {
    constructor(
        public description: string | undefined,
        public transactionGroups: ITransactionMessageComponentGroup[],
        public xdr: string,
    ) {}
}
