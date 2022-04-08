import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class ClawbackComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.Clawback) {
        super({
            title: language.OPERATION_CLAWBACK,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ASSET, value: operation.asset.code },
                { title: language.AMOUNT, value: operation.amount },
                { title: language.FROM, value: operation.from },
            ],
        });
    }
}
