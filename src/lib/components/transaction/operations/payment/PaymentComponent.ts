import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation as OperationType, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class PaymentComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: OperationType.Payment) {
        super({
            title: language.OPERATION_PAYMENT,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.AMOUNT, value: operation.amount },
                { title: language.ASSET, value: operation.asset.code },
                { title: language.DESTINATION, value: operation.destination },
            ],
        });
    }
}
