import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class ManageDataComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.ManageData) {
        super({
            title: language.OPERATION_MANAGE_DATA,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.NAME, value: operation.name },
                operation.value ? { title: language.DATA, value: operation.value } : { title: '', value: '' },
            ],
        });
    }
}
